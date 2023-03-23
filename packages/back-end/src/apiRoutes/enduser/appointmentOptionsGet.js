const loadQuote = require('../../utils/loadQuote');
const getAppointmentTimeOptions = require('../../utils/getAppointmentTimeOptions');
const Appointment = require('../../resources/Appointment');
const Shop = require('../../resources/Shop');
const ServiceType = require('../../resources/ServiceType');

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;
  const { date } = req.query;

  const shop = await new Shop().loadBy({});
  const { isOpen, openDate, closeDate } = shop.getOpeningHoursForDate(date);

  if (!isOpen) return res.json([]);

  const quote = await loadQuote({ customerId, quoteId });
  if (!quote.attributes.isFinalized) throw new Error('Quote is not finalized');

  try {
    new Appointment().loadBy({ quoteId });
    return res.status(409).json({ error: 'Quote already has an appointment' });
  } catch (e) {
    // This is the happy path, expected to not find any appointment for the quote
  }

  // Get pre-existing appointments
  const appointmentPromises = (
    await Appointment.AppointmentModel.find(
      { startsAt: { $gte: openDate, $lt: closeDate } },
      ['_id']
    ).exec()
  ).map(({ id }) => new Appointment().loadById(id.toString()));
  const existingAppointments = await Promise.all(appointmentPromises);

  // Summarize services' length
  const serviceTypePromises = quote.attributes.lineItems.map(
    ({ serviceTypeId }) => new ServiceType().loadById(serviceTypeId)
  );
  const serviceTypes = await Promise.all(serviceTypePromises);

  const appointmentLengthMins = serviceTypes.reduce(
    (acc, { attributes }) => acc + attributes.timeInMinutes,
    0
  );

  // Generate options
  const options = await getAppointmentTimeOptions({
    existingAppointments,
    openDate, // Date obj with appropriate date/time
    closeDate, // Date obj with appropriate date/time
    numberOfStalls: shop.attributes.numberOfStalls,
    appointmentLengthMins,
  });

  return res.json(options);
};
