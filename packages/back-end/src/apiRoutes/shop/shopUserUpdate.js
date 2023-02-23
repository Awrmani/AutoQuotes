const { omit } = require('lodash');
const ShopUser = require('../../resources/ShopUser');
const FieldValidationError = require('../../resources/errors/FieldValidationError');

module.exports = async (req, res) => {
  const { id } = req.params;

  let patchWith = req.body;
  let userToChange;
  if (id === 'current' || id === req.user.id) {
    // The user wants to update their own information
    userToChange = await ShopUser.loadById(req.user.id);

    // Users cannot update their own role
    patchWith = omit(patchWith, ['role']);
  } else {
    // A user is trying to update someone else's information
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Only admin users can perform this operation' });
    }

    // An admin user is trying to update an other user
    try {
      userToChange = await new ShopUser().loadById(id);
    } catch (e) {
      return res.status(404).json({ error: 'Cannot reload user with that ID' });
    }
  }

  if (req.user.email && req.user.email !== userToChange.attributes.email) {
    // Changing email
    try {
      await new ShopUser().loadBy({ email: req.user.email });
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
