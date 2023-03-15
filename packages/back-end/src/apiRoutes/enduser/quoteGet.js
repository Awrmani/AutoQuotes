const loadQuote = require('../../utils/loadQuote');

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;

  const quote = await loadQuote({ customerId, quoteId });

  return res.json(quote.attributes);
};
