const Quote = require('../../resources/Quote');
const VehicleType = require('../../resources/VehicleType');

/**
 * A quote can be created by an authenticated or unauthenticated user
 * In case of the later, the quote will have to be associated with a user
 * in order to get quotes or book an appointment
 */

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may be unauthenticated
  const { vehicleTypeId } = req.body ?? {};

  try {
    await new VehicleType().loadById(vehicleTypeId);
  } catch (e) {
    throw new Error('Vehicle type not found');
  }

  const quote = new Quote({
    customerId,
    vehicleTypeId,
    lineItems: [],
    isFinalized: false,
  });

  const id = await quote.save();

  return res.json({ id });
};
