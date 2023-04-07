const Quote = require('../../resources/Quote');
const Appointment = require('../../resources/Appointment');
const VehicleType = require('../../resources/VehicleType');

/**
 * List all quotes associated with the user
 */

module.exports = async (req, res) => {
  const promises = (
    await Quote.QuoteModel.find({ customerId: req.user.id }, ['_id']).exec()
  ).map(({ id }) => new Quote().loadById(id.toString()));

  const quotes = (await Promise.all(promises)).map(obj => obj.attributes);

  const quotesWithAppointmentsPromises = quotes.map(async quote => {
    const vehicleType = await new VehicleType().loadById(quote.vehicleTypeId);

    let appointment;
    try {
      // Try to load and merge in appointment for quote
      appointment = await new Appointment().loadBy({ quoteId: quote.id });
    } catch (e) {
      // No appointment found for quote
    }

    return {
      ...quote,
      appointment: appointment?.attributes,
      vehicleType: vehicleType?.attributes,
    };
  });

  return res.json(await Promise.all(quotesWithAppointmentsPromises));
};
