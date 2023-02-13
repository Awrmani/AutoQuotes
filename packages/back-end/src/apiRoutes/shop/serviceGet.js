const Service = require('../../resources/ServiceType');

module.exports = async (req, res) => {
  const { id } = req.params;

  const service = await new Service().loadById(id);

  res.json(service.attributes);
};
