const loadQuote = require('../../utils/loadQuote');
const getAppointmentTimeOptionsForQuote = require('../../utils/getAppointmentTimeOptionsForQuote');
const Appointment = require('../../resources/Appointment');

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;
  const { date } = req.query;

  const quote = await loadQuote({ customerId, quoteId });

  if (!quote.attributes.isFinalized) throw new Error('Quote is not finalized');
  try {
    await new Appointment().loadBy({ quoteId });

    return res.status(409).json({ error: 'Quote already has an appointment' });
  } catch (e) {
    // This is the happy path, expected to not find any appointment for the quote
  }

  const options = await getAppointmentTimeOptionsForQuote({ date, quoteId });

  const deduplicatedOptions = options.reduce((acc, option) => {
    // If we already have that option, no point in adding it again (for a different stall)
    const found = acc.some(
      toCheck =>
        toCheck.start.toISOString() === option.start.toISOString() &&
        toCheck.end.toISOString() === option.end.toISOString()
    );

    if (found) return acc;

    return [...acc, { start: option.start, end: option.end }];
  }, []);

  return res.json(deduplicatedOptions);
};
