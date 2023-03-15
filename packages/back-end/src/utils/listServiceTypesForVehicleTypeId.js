const VehicleType = require('../resources/VehicleType');
const ServiceType = require('../resources/ServiceType');
const compatibleVehiclesConditionGenerator = require('./compatibleVehiclesConditionGenerator');

const listServiceTypesForVehicleTypeId = async vehicleTypeId => {
  let vehicleType;
  try {
    vehicleType = await new VehicleType().loadById(vehicleTypeId);
  } catch (e) {
    throw new Error('Vehicle type does not exist');
  }

  const { make, model, modelYear } = vehicleType.attributes;

  const serviceTypeIds = await ServiceType.ServiceTypeModel.find(
    compatibleVehiclesConditionGenerator({ make, model, modelYear }),
    ['_id']
  );

  const promises = serviceTypeIds.map(({ id }) =>
    new ServiceType().loadById(id.toString())
  );

  return Promise.all(promises);
};

module.exports = listServiceTypesForVehicleTypeId;
