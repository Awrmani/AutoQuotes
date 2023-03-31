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
  const customerId = req.user.id;
  const { quoteId } = req.params;
  const { lineItems } = req.body ?? {};

  const quote = await loadQuote({ customerId, quoteId });

  if (quote.attributes.isFinalized)
    throw new Error('Quote is already finalized');

  if (!lineItems?.length)
    throw new Error(
      'Cannot finalize a quote that does not have any line items'
    );

  if (lineItems.length !== quote.attributes.lineItems.length)
    throw new Error(
      'Stored quote and finalization data has different number of line items'
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

  lineItems.forEach(({ selectedParts }) => {
    if (selectedParts?.includes(null))
      throw new Error(
        'All parts has to be selected in order to finalize a quote'
      );
  });

  // Okay, finalization request is accepted
  quote.update({ isFinalized: true, lineItems: transformedLineItems });

  await quote.save();

  return res.json({});
};
