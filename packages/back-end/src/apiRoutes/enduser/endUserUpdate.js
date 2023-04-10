const EndUser = require('../../resources/EndUser');
const FieldValidationError = require('../../resources/errors/FieldValidationError');

module.exports = async (req, res) => {
  const { id, ...patchWith } = req.body;

  const userToChange = await new EndUser().loadById(req.user.id);

  if (req.user.email && req.user.email !== userToChange.attributes.email) {
    // Changing email
    try {
      await new EndUser().loadBy({ email: req.user.email });
      throw new FieldValidationError({ email: 'This email already exists' });
    } catch (e) {
      // This is expected
    }
  }

  // Update user's information and save
  await userToChange.update(patchWith).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
