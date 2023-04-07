const EndUser = require('../../resources/EndUser');

/**
 * Some tests may require to start from a clean slate
 * This endpoint re-seeds the DB (only available in dev/testing)
 */
module.exports = async (req, res) => {
  const { id } = req.params;

  const enduser = await new EndUser().loadById(id);

  return res.json({ verificationCode: enduser.attributes.verificationCode });
};
