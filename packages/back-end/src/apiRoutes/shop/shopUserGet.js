const ShopUser = require('../../resources/ShopUser');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (id === 'current' || id === req.user.id) {
    // The user wants their own information
    return res.json(req.user);
  }

  if (req.user.role !== 'admin')
    return res
      .status(403)
      .json({ error: 'Only admin users can perform this operation' });

  let su;
  try {
    su = await new ShopUser().loadById(id);
    return res.json(su.attributes);
  } catch (e) {
    return res.status(404).json({ error: 'Cannot reload user with that ID' });
  }
};
