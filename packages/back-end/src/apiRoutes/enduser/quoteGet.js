const loadQuote = require('../../utils/loadQuote');
const ServiceType = require('../../resources/ServiceType');
const VehicleType = require('../../resources/VehicleType');
const Shop = require('../../resources/Shop');
const listCompatiblePartsForQuoteServiceType = require('../../utils/listCompatiblePartsForQuoteServiceType');

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;

  const shop = await new Shop().loadBy({});
  const { hourlyPriceOfLabor } = shop.attributes;
  const quote = await loadQuote({ customerId, quoteId });

  const vehicleType = await new VehicleType().loadById(
    quote.attributes.vehicleTypeId
  );

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

      const laborCost =
        Math.round(
          (serviceType.attributes.timeInMinutes / 60) * hourlyPriceOfLabor * 100
        ) / 100;

      return {
        serviceTypeId,
        name: serviceType.attributes.name,
        timeInMinutes: serviceType.attributes.timeInMinutes,
        laborCost,
        laborTax: laborCost * (shop.attributes.taxPercent / 100),
        taxPercent: shop.attributes.taxPercent,
        description: serviceType.attributes.description,
        requiredParts,
      };
    }
  );

  const expandedLineItems = await Promise.all(expandedLineItemPromises);

  return res.json({
    ...quote.attributes,
    vehicleType: vehicleType.attributes,
    lineItems: expandedLineItems,
  });
};
