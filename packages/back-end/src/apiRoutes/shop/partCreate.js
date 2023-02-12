const Part = require('../../resources/Part');
const VehicleType = require('../../resources/VehicleType');
const FieldValidationError = require('../../resources/FieldValidationError');

module.exports = async (req, res) => {
  // Excluding ID from object
  const { id, ...partData } = req.body ?? {};

  // If array is given, try to instantiate all vehicle types, if successful, all exist.
  try {
    await Promise.all(
      partData.compatibleVehicles.map(vehicleTypeId =>
        new VehicleType().loadById(vehicleTypeId)
      )
    );
  } catch (e) {
    throw new FieldValidationError({
      compatibleVehicles: 'Not array, or some vehicles does not exist',
    });
  }

  // Resources handle their own format validation and throw special
  // errors, that are in turn handled by a specific Express middleware
  const su = await new Part(partData).save();

  return res.json(su.attributes);
};
