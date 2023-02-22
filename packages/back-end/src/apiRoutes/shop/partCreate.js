const { omit } = require('lodash');
const Part = require('../../resources/Part');

module.exports = async (req, res) => {
  // Resources handle their own format validation and throw special
  // errors, that are in turn handled by a specific Express middleware
  await new Part(
    // Excluding non-editable fields from the request
    omit(req.body, ['id', 'supplierId', 'offerExpiration', 'exclusiveQuoteId'])
  ).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
