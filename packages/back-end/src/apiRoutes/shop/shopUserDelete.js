const ShopUser = require('../../resources/ShopUser');

module.exports = async (req, res) => {
  const { id } = req.params;

  let su;
  if (id === 'current' || id === req.user.id) {
    // The user wants to delete themselves
    su = await ShopUser.loadById(req.user.id);
  } else {
    // A user is trying to delete an other user
    if (req.user.role !== 'admin') {
      return res
        .status(403)
        .json({ error: 'Only admin users can perform this operation' });
    }

    // An admin user is trying to delete an other user
    try {
      su = await new ShopUser().loadById(id);
    } catch (e) {
      return res.status(404).json({ error: 'Cannot reload user with that ID' });
    }
  }

  // Update user's information and save
  const deletedID = await su.delete();

  return res.json({ id: deletedID });
};
