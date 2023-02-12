const Part = require('../../resources/Part');
const VehicleType = require('../../resources/VehicleType');
const FieldValidationError = require('../../resources/FieldValidationError');

module.exports = async (req, res) => {
  const { id } = req.params;

  const part = await new Part().loadById(id);

  const { compatibleVehicles } = req.body;

  // If array is given, try to instantiate all vehicle types, if successful, all exist.
  try {
    await Promise.all(
      compatibleVehicles?.map(vehicleTypeId =>
        new VehicleType().loadById(vehicleTypeId)
      )
    );
  } catch (e) {
    throw new FieldValidationError({
      compatibleVehicles: 'Not array, or some vehicles does not exist',
    });
  }

  // Resource handles it's own validation
  part.update(req.body).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
