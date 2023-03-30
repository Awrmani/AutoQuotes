const Quote = require('../resources/Quote');
const listCompatiblePartsForQuoteServiceType = require('./listCompatiblePartsForQuoteServiceType');

/**
 * If the quote is yet unassociated, and a user is logged in,
 * then associatem the an anonymous quote with the end-user
 *
 * Also, if one of the selected parts is no longer available,
 * we are removing that selection before returning the quote
 */

const loadQuote = async ({ customerId, quoteId }) => {
  const quote = await new Quote().loadById(quoteId);

  if (quote.attributes.customerId && customerId !== quote.attributes.customerId)
    throw new Error('Quote is already associated with a different user');

  if (!quote.attributes.customerId && customerId) {
    // Associate quote with the current user
    quote.update({ customerId });
    await quote.save();
  }

  // If quote is finalized we won't change it
  if (quote.attributes.isFinalized) return quote;

  // Make sure that all selected parts are still available. If not, set them back to null
  let toUpdate = false;
  const lineItemsPromises = quote.attributes.lineItems?.map(async lineItem => {
    const selectedPartsPromises = lineItem.selectedParts.map(
      async selectedPart => {
        const compatibleParts = await listCompatiblePartsForQuoteServiceType({
          quoteId,
          serviceTypeId: lineItem.serviceTypeId,
          vehicleTypeId: quote.attributes.vehicleTypeId,
        });

        // Check if option is still true for part
        const matching = compatibleParts?.options?.find(
          ({ id }) => id === selectedPart.id
        );

        if (matching) return selectedPart;

        toUpdate = true;
        return null;
      }
    );

    return {
      ...lineItem,
      selectedParts: await Promise.all(selectedPartsPromises),
    };
  });

  if (toUpdate) {
    quote.update({ lineItems: await Promise.all(lineItemsPromises) });
    await quote.save();
  }

  return quote;
};

module.exports = loadQuote;
