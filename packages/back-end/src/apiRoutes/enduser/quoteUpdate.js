const loadQuote = require('../../utils/loadQuote');
const { verifyLineItem } = require('../../utils/verifyQuoteUpdate');

/**
 * Example request body:
 * {
 *   lineItems: [
 *     {
 *       serviceTypeId: 'abcdefghijkl',
 *       requiredParts: [
 *         123456789101,
 *         123456789102
 *       ]
 *     },
 *     {
 *       serviceTypeId: 'cbadefghijkl',
 *       requiredParts: [
 *         123456789103,
 *         123456789104
 *       ]
 *     },
 *   ]
 * }
 */

module.exports = async (req, res) => {
  const customerId = req.user?.id;
  const { quoteId } = req.params;
  const { lineItems } = req.body ?? {};

  const quote = await loadQuote({ customerId, quoteId });

  if (quote.attributes.isFinalized)
    throw new Error('Quote is already finalized');

  if (lineItems.length !== quote.attributes.lineItems.length)
    throw new Error(
      'Stored quote and incoming data has different number of line items'
    );

  // Verify each line item
  const transformedLineItems = await Promise.all(
    lineItems.map((lineItem, index) =>
      verifyLineItem({
        lineItem,
        quoteLineItem: quote.attributes.lineItems[index],
        index,
        quoteId,
      })
    )
  );

  // Okay, update request is accepted
  quote.update({ lineItems: transformedLineItems });

  await quote.save();

  return res.json({});
};
