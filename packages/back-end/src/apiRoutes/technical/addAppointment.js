const getAppointmentTimeOptions = require('../../utils/getAppointmentTimeOptions');
const Appointment = require('../../resources/Appointment');
const Shop = require('../../resources/Shop');
const Quote = require('../../resources/Quote');
/**
 * Some tests may require appointments to be present.
 * This technical endpoint adds an appointment
 * to the current day, first available time slot
 * but takes care not to create a time collision
 * (while ignoring shop opening hours) FOR TESTING ONLY
 */
module.exports = async (req, res) => {
  const curDateTime = new Date();
  const dayStart = new Date(
    curDateTime.getFullYear(),
    curDateTime.getMonth(),
    curDateTime.getDate()
  );

  const dayEnd = new Date(
    curDateTime.getFullYear(),
    curDateTime.getMonth(),
    curDateTime.getDate(),
    23,
    59,
    59
  );

  const eightAm = new Date(
    curDateTime.getFullYear(),
    curDateTime.getMonth(),
    curDateTime.getDate(),
    8
  );

  const fourPm = new Date(
    curDateTime.getFullYear(),
    curDateTime.getMonth(),
    curDateTime.getDate(),
    16
  );

  const promises = (
    await Appointment.AppointmentModel.find(
      { startsAt: { $gte: dayStart, $lt: dayEnd } },
      ['_id']
    ).exec()
  ).map(({ id }) => new Appointment().loadById(id.toString()));

  const existingAppointments = await Promise.all(promises);

  const shop = await new Shop().loadBy({});

  // Get all our options calculated
  const options = getAppointmentTimeOptions({
    existingAppointments,
    openDate: eightAm,
    closeDate: fourPm,
    stallCount: shop.attributes.numberOfStalls,
    appointmentLengthMins: 90,
  });

  // Get a random quote
  const quote = await new Quote().loadBy({});

  // Select the first from the available time slots and add the dummy appointment
  const newApp = new Appointment({
    stall: options[0].stall,
    startsAt: options[0].start.toISOString(),
    duration: 90,
    customerId: quote.attributes.customerId,
    quoteId: quote.attributes.id,
  });
  await newApp.save();

  return res.json({});
};
