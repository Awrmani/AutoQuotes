const VehicleType = require('../../resources/VehicleType');

module.exports = async (req, res) => {
  const promises = (
    await VehicleType.VehicleTypeModel.find({}, ['_id']).exec()
  ).map(({ id }) => new VehicleType().loadById(id.toString()));

  const objects = (await Promise.all(promises)).map(obj => obj.attributes);

  return res.json(objects);
};
