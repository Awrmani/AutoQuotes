const Service = require('../../resources/ServiceType');

module.exports = async (req, res) => {
  const promises = (
    await Service.ServiceTypeModel.find({}, ['_id']).exec()
  ).map(({ id }) => new Service().loadById(id.toString()));

  const objects = await Promise.all(promises).map(obj => obj.attributes);

  return res.json(objects);
};
