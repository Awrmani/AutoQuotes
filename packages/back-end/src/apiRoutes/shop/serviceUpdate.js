const Service = require('../../resources/ServiceType');

module.exports = async (req, res) => {
  const { id } = req.params;

  const service = await new Service().loadById(id);

  // Resource handles it's own validation
  service.update(req.body).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
