const Quote = require('../resources/Quote');

/**
 * If the quote is yet unassociated, and a user is logged in,
 * then associatem the an anonymous quote with the end-user
 */

const loadQuote = async ({ customerId, quoteId }) => {
  const quote = await new Quote().loadById(quoteId);

  if (quote.attributes.customerId && customerId !== quote.attributes.customerId)
    throw new Error('Quote is already associated with a different user');

  if (!quote.attributes.customerId && customerId) {
    // Associate quote with the current user
    quote.update({ customerId });
    await quote.save();
  }

  return quote;
};

module.exports = loadQuote;
