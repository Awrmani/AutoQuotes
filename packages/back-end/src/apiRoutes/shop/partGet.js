const Part = require('../../resources/Part');

module.exports = async (req, res) => {
  const { id } = req.params;

  // Can only edit non-offer parts
  const part = await new Part().loadBy({ id, exclusiveQuoteId: null });

  res.json(part.attributes);
};
