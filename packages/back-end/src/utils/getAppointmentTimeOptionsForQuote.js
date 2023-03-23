const getAppointmentTimeOptions = require('./getAppointmentTimeOptions');
const Appointment = require('../resources/Appointment');
const Shop = require('../resources/Shop');
const Quote = require('../resources/Quote');
const ServiceType = require('../resources/ServiceType');

const getAppointmentTimeOptionsForQuote = async ({ quoteId, date }) => {
  const shop = await new Shop().loadBy({});
  const { isOpen, openDate, closeDate } = shop.getOpeningHoursForDate(date);

  if (!isOpen) return [];

  const quote = await new Quote().loadById(quoteId);

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

  return options;
};

module.exports = getAppointmentTimeOptionsForQuote;
