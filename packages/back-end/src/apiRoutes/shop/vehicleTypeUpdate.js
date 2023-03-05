const VehicleType = require('../../resources/VehicleType');

module.exports = async (req, res) => {
  const { id } = req.params;

  const vehicleType = await new VehicleType().loadById(id);

  // Resource handles it's own validation
  vehicleType.update(req.body).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
