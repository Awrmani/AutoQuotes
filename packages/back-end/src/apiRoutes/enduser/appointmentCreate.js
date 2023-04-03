const loadQuote = require('../../utils/loadQuote');
const getAppointmentTimeOptionsForQuote = require('../../utils/getAppointmentTimeOptionsForQuote');
const Appointment = require('../../resources/Appointment');

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;
  const { start } = req.body;

  const quote = await loadQuote({ customerId, quoteId });

  if (!quote.attributes.isFinalized) throw new Error('Quote is not finalized');

  try {
    await new Appointment().loadBy({ quoteId });

    return res.status(409).json({ error: 'Quote already has an appointment' });
  } catch (e) {
    // This is the happy path, expected to not find any appointment for the quote
  }

  const options = await getAppointmentTimeOptionsForQuote({
    date: start,
    quoteId,
  });

  // List all matching time slots (multiple stalls)
  const slots = options.filter(
    toCheck => toCheck.start.toISOString() === start
  );

  if (!slots.length) {
    throw new Error('Slot not available anymore. Please reload page');
  }

  // Select a random one from available slots, to be fair with mechanics
  const selectedSlot = slots[Math.floor(Math.random() * slots.length)];

  const appointment = new Appointment({
    stall: selectedSlot.stall,
    startsAt: selectedSlot.start,
    duration: ((selectedSlot.end - selectedSlot.start) / 60) * 1000,
    customerId,
    quoteId: quote.attributes.id,
  });
  await appointment.save();

  return res.json({});
};
