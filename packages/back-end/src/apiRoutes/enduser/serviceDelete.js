module.exports = async (req, res) => {};
const loadQuote = require('../../utils/loadQuote');

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId, serviceTypeId } = req.params;

  const quote = await loadQuote({ customerId, quoteId });

  const newLineItems = quote.attributes.lineItems.filter(
    ({ serviceTypeId: toCheck }) => toCheck !== serviceTypeId
  );

  quote.update({ lineItems: newLineItems });

  await quote.save();

  return res.json({});
};
