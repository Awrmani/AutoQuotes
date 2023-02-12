const { omit } = require('lodash');
const ShopUser = require('../../resources/ShopUser');

module.exports = async (req, res) => {
  const { id } = req.params;

  let patchWith = req.body;
  let su;
  if (id === 'current' || id === req.user.id) {
    // The user wants to update their own information
    su = await ShopUser.loadById(req.user.id);

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
      su = await new ShopUser().loadById(id);
    } catch (e) {
      return res.status(404).json({ error: 'Cannot reload user with that ID' });
    }
  }

  // Update user's information and save
  await su.update(patchWith).save();

  return res.json(su.attributes);
};
