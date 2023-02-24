const Service = require('../../resources/ServiceType');

module.exports = async (req, res) => {
  const { id } = req.params;

  const service = await new Service().loadById(id);

  // Update user's information and save
  const deletedID = await service.delete();

  res.json({ id: deletedID });
};
