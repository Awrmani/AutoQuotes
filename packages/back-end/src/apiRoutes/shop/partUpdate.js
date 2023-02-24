const { omit } = require('lodash');
const Part = require('../../resources/Part');

module.exports = async (req, res) => {
  const { id } = req.params;

  // Only allow to edit non-offer parts
  const part = await new Part().loadBy({ id, exclusiveQuoteId: null });

  // Resource handles it's own validation
  part
    .update(
      // Excluding non-editable fields from the request
      omit(req.body, [
        'id',
        'supplierId',
        'offerExpiration',
        'exclusiveQuoteId',
      ])
    )
    .save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
