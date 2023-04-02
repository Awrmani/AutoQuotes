const Quote = require('../../resources/Quote');
const VehicleType = require('../../resources/VehicleType');

/**
 * A quote can be created by an authenticated or unauthenticated user
 * In case of the later, the quote will have to be associated with a user
 * in order to get quotes or book an appointment
 */

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may be unauthenticated
  const { make, model, modelYear, engineVariant, bodyType } = req.body ?? {};

  let vehicleType;
  try {
    vehicleType = await new VehicleType().loadBy({
      make,
      model,
      modelYear,
      engineVariant,
      bodyType,
    });
  } catch (e) {
    throw new Error('Vehicle type not found');
  }

  // Delete previous empty quotes for the user
  if (customerId) {
    await Quote.QuoteModel.deleteMany({
      $and: [
        { customerId },
        {
          $or: [
            { lineItems: { $eq: [] } },
            { lineItems: { $eq: null } },
            { lineItems: { $exists: false } },
          ],
        },
      ],
    });
  }

  const quote = new Quote({
    customerId,
    vehicleTypeId: vehicleType.attributes.id,
    lineItems: [],
    isFinalized: false,
  });

  const id = await quote.save();

  return res.json({ id });
};
