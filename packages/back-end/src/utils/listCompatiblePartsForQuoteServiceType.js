const { pick } = require('lodash');
const VehicleType = require('../resources/VehicleType');
const Part = require('../resources/Part');
const ServiceType = require('../resources/ServiceType');
const compatibleVehiclesConditionGenerator = require('./compatibleVehiclesConditionGenerator');

const listCompatiblePartsForPartRow = async ({
  make,
  model,
  modelYear,
  partName,
  quoteId,
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
    new Part()
      .loadById(id.toString())
      .then(({ attributes }) =>
        pick(attributes, ['name', 'type', 'warrantyMonths', 'price', 'id'])
      )
  );

  return Promise.all(partPromises);
};

const listCompatiblePartsForQuoteServiceType = async ({
  quoteId,
  serviceTypeId,
  vehicleTypeId,
}) => {
  const vehicleType = await new VehicleType().loadById(vehicleTypeId);
  const serviceType = await new ServiceType().loadById(serviceTypeId);
  const { make, model, modelYear } = vehicleType.attributes;

  const nestedOptionPromises = serviceType.attributes.requiredParts.map(
    async ({ name: partName }) => ({
      name: partName,
      options: await listCompatiblePartsForPartRow({
        make,
        model,
        modelYear,
        partName,
        quoteId,
      }),
    })
  );

  const nestedOptions = Promise.all(nestedOptionPromises);

  return nestedOptions;
};

module.exports = listCompatiblePartsForQuoteServiceType;
