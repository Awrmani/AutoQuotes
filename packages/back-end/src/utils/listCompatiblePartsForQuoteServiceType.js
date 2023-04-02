const VehicleType = require('../resources/VehicleType');
const Shop = require('../resources/Shop');
const Part = require('../resources/Part');
const ServiceType = require('../resources/ServiceType');
const ThirdPartyOfferRequest = require('../resources/ThirdPartyOfferRequest');
const compatibleVehiclesConditionGenerator = require('./compatibleVehiclesConditionGenerator');

const listCompatiblePartsForPartRow = async ({
  make,
  model,
  modelYear,
  partName,
  quoteId,
  taxPercent,
}) => {
  const partIds = await Part.PartModel.find(
    {
      $and: [
        // Filterfor vehicle type
        compatibleVehiclesConditionGenerator({ make, model, modelYear }),
        // filter for service type
        { name: partName },
        {
          $or: [
            { exclusiveQuoteId: { $exists: false } },
            { exclusiveQuoteId: null },
            { exclusiveQuoteId: quoteId },
            { amountInStock: { $gte: 1 } },
          ],
        },
        {
          $or: [
            { offerExpiration: { $exists: false } },
            { offerExpiration: null },
            { offerExpiration: { $gte: new Date() } },
          ],
        },
      ],
    },
    ['_id']
  );

  const partPromises = partIds.map(({ id }) =>
    new Part().loadById(id.toString()).then(({ attributes }) => ({
      name: attributes.name,
      type: attributes.type,
      warrantyMonths: attributes.warrantyMonths,
      price: attributes.price,
      partTax: attributes.price * (taxPercent / 100),
      taxPercent,
      id: attributes.id,
    }))
  );

  return Promise.all(partPromises);
};

const listCompatiblePartsForQuoteServiceType = async ({
  quoteId,
  serviceTypeId,
  vehicleTypeId,
}) => {
  const shop = await new Shop().loadBy({});
  const vehicleType = await new VehicleType().loadById(vehicleTypeId);
  const serviceType = await new ServiceType().loadById(serviceTypeId);
  const { make, model, modelYear } = vehicleType.attributes;

  const nestedOptionPromises = serviceType.attributes.requiredParts.map(
    async ({ name: partName }) => {
      const options = await listCompatiblePartsForPartRow({
        make,
        model,
        modelYear,
        partName,
        quoteId,
        taxPercent: shop.attributes.taxPercent,
      });

      // Let's check if we have requested 3rd party offers for this part or not
      let thirdPartyOffersRequested = false;
      try {
        await new ThirdPartyOfferRequest().loadBy({
          quoteId,
          serviceTypeId,
          partName,
        });
        thirdPartyOffersRequested = true;
      } catch (e) {
        // noop, not found
      }

      return {
        name: partName,
        options,
        thirdPartyOffersRequested,
      };
    }
  );

  const nestedOptions = await Promise.all(nestedOptionPromises);

  return nestedOptions;
};

module.exports = listCompatiblePartsForQuoteServiceType;
