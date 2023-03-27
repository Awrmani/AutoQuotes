const loadQuote = require('../../utils/loadQuote');
const ServiceType = require('../../resources/ServiceType');
const Shop = require('../../resources/Shop');
const listCompatiblePartsForQuoteServiceType = require('../../utils/listCompatiblePartsForQuoteServiceType');

/**
 * todo calculate cost of work
 */

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;

  const shop = await new Shop().loadBy({});
  const { hourlyPriceOfLabor } = shop.attributes;
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
          selected: selectedPartId ?? '',
          options,
        };
      });

      return {
        serviceTypeId,
        name: serviceType.attributes.name,
        timeInMinutes: serviceType.attributes.timeInMinutes,
        laborCost:
          Math.round(
            (serviceType.attributes.timeInMinutes / 60) *
              hourlyPriceOfLabor *
              100
          ) / 100,
        description: serviceType.attributes.description,
        requiredParts,
      };
    }
  );

  const expandedLineItems = await Promise.all(expandedLineItemPromises);

  return res.json({ ...quote.attributes, lineItems: expandedLineItems });
};
