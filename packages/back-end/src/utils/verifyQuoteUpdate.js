const { pick } = require('lodash');
const ServiceType = require('../resources/ServiceType');
const Part = require('../resources/Part');

/**
 * This fn verifies if the selected parts for a specific line item
 * are all acceptable
 *
 * @param {array<object>} requiredParts Part of the ServiceType schema
 * @param {array<string>} selectedParts selected partids that the end-user submitted
 * @param {int} lineItemIndex index of the line item we are processing for error text generation
 * @param {string} quiteId ID of the quote to verify 3rd party offer against
 *
 * @returns {array<object>} the structure that we will be able to store in Quote.lineItems[lineItemIndex].selectedParts
 */
const verifySelectedParts = async ({
  requiredParts,
  selectedParts,
  lineItemIndex,
  quoteId,
}) => {
  if (requiredParts.length !== selectedParts.length)
    throw new Error(
      `Line item [${lineItemIndex}] has a different number of required parts`
    );

  // Verify each part
  const processedSelectedParts = requiredParts.map(
    async (requiredPart, index) => {
      const selectedPartId = selectedParts[index].selected;

      if (!selectedPartId) return null;

      const selectedPart = await new Part().loadById(selectedPartId);
      const { name, exclusiveQuoteId, offerExpiration, amountInStock } =
        selectedPart.attributes;

      if (requiredPart.name !== name)
        throw new Error(
          `Selected part [${index}] in line item [${lineItemIndex}] is incompatible with the service type`
        );

      if (exclusiveQuoteId && exclusiveQuoteId !== quoteId)
        throw new Error(
          `Selected part [${index}] in line item [${lineItemIndex}] is reserved for an other quote`
        );

      if (offerExpiration && new Date(offerExpiration) < new Date())
        throw new Error(
          `Offer has expired for aelected part [${index}] in line item [${lineItemIndex}]`
        );

      if (amountInStock < 1 && !exclusiveQuoteId)
        throw new Error(
          `Selected part [${index}] in line item [${lineItemIndex}] is not in stock`
        );

      // Okay, part is accepted, let's return the structure our Quote schema will accept

      return pick(selectedPart.attributes, [
        'id',
        'name',
        'description',
        'manufacturer',
        'type',
        'warrantyMonths',
        'price',
        'supplierId',
      ]);
    }
  );

  return Promise.all(processedSelectedParts);
};

/**
 * This fn verifies if all line items in a quote finalization request
 * are acceptavle
 *
 * @param {object} lineItem Data submitted by the end user for the line item
 * @param {object} quoteLineItem Quote.lineItem we are testing the submitted data against
 * @param {int} index Index of the line item we are processing for error text generation
 * @param {string} quoteId to be passed on for part selection verification
 *
 * @returns {object} the structure we can store in Quote.lineItems[index]
 */
const verifyLineItem = async ({ lineItem, quoteLineItem, index, quoteId }) => {
  if (quoteLineItem.serviceTypeId !== lineItem.serviceTypeId)
    throw new Error(`Line item [${index}] has a different serviceTypeId`);

  // Load service type
  const serviceType = await new ServiceType().loadById(lineItem.serviceTypeId);
  const { requiredParts } = serviceType.attributes;

  const selectedParts = await verifySelectedParts({
    requiredParts,
    selectedParts: lineItem.requiredParts,
    lineItemIndex: index,
    quoteId,
  });

  // Okay, line item is accepted

  return {
    serviceTypeId: quoteLineItem.serviceTypeId,
    selectedParts,
  };
};

module.exports = { verifyLineItem };
