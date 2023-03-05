const VehicleType = require('../../resources/VehicleType');

module.exports = async (req, res) => {
  const { id } = req.params;

  const vehicleType = await new VehicleType().loadById(id);

  const deletedID = await vehicleType.delete();

  res.json({ id: deletedID });
};
