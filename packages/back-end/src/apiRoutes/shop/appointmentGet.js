const Appointment = require('../../resources/Appointment');
const EndUser = require('../../resources/EndUser');
const Quote = require('../../resources/Quote');

module.exports = async (req, res) => {
  const { id } = req.params;

  const appointment = await new Appointment().loadById(id);

  // Expand customer and quote also
  const { quoteId, customerId } = appointment.attributes;
  const customer = await new EndUser().loadBy(customerId);
  const quote = await new Quote().loadBy(quoteId);

  res.json({
    appointment: appointment.attributes,
    customer: customer.attributes,
    quote: quote.attributes,
  });
};