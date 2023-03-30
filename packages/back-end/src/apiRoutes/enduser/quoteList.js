const Quote = require('../../resources/Quote');
const Appointment = require('../../resources/Appointment');

/**
 * List all quotes associated with the user
 */

module.exports = async (req, res) => {
  const promises = (
    await Quote.QuoteModel.find({ customerId: req.user.id }, ['_id']).exec()
  ).map(({ id }) => new Quote().loadById(id.toString()));

  const quotes = (await Promise.all(promises)).map(obj => obj.attributes);

  const quotesWithAppointmentsPromises = quotes.map(async quote => {
    try {
      // Try to load and merge in appointment for quote
      const appointment = await new Appointment().loadBy({ quoteId: quote.id });

      return { ...quote, appointment: appointment.attributes };
    } catch (e) {
      // No appointment found for quote
      return quote;
    }
  });

  return res.json(await Promise.all(quotesWithAppointmentsPromises));
};
