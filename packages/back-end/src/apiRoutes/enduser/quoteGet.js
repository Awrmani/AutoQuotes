const loadQuote = require('../../utils/loadQuote');
const ServiceType = require('../../resources/ServiceType');
const listCompatiblePartsForQuoteServiceType = require('../../utils/listCompatiblePartsForQuoteServiceType');

/**
 * ok, so now what you get is the "serviceTypeId"
 * Additionally, you'll need the actual serviceType
 * and for that service type the compatible parts for each row in it
 */

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;

  const quote = await loadQuote({ customerId, quoteId });

  // Expand the line items with the service type and all available options
  const expandedLineItemPromises = quote.attributes.lineItems.map(
    async lineItem => {
      const { serviceTypeId, selectedParts } = lineItem;

      const serviceType = await new ServiceType().loadById(serviceTypeId);

      const compatibleParts = await listCompatiblePartsForQuoteServiceType({
        quoteId,
        serviceTypeId,
        vehicleTypeId: quote.attributes.vehicleTypeId,
      });

      // Map over all the required parts combine selection with options
      const requiredParts = compatibleParts.map(({ name, options }, index) => {
        const selectedPartId = selectedParts?.[index]?.id;
        return {
          name,
          selected: selectedPartId ?? null,
          options,
        };
      });

      return {
        serviceTypeId,
        name: serviceType.attributes.name,
        timeInMinutes: serviceType.attributes.timeInMinutes,
        description: serviceType.attributes.description,
        requiredParts,
      };
    }
  );

  const expandedLineItems = await Promise.all(expandedLineItemPromises);

  return res.json({ ...quote.attributes, lineItems: expandedLineItems });
};
