const Quote = require('../../resources/Quote');

/**
 * If the quote is yet unassociated, and a user is logged in,
 * then associatem the an anonymous quote with the end-user
 */

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { id } = req.params;

  const quote = await new Quote().loadById(id);

  if (quote.attributes.customerId && customerId !== quote.attributes.customerId)
    throw new Error('Quote is already associated with a different user');

  if (!quote.attributes.customerId && customerId) {
    // Associate quote with the current user
    quote.update({ customerId });
    await quote.save();
  }

  return res.json(quote.attributes);
};
