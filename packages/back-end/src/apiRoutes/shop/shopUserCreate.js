const ShopUser = require('../../resources/ShopUser');

module.exports = async (req, res) => {
  if (req.user.role !== 'admin')
    return res
      .status(403)
      .json({ error: 'Only admin users can perform this operation' });

  // Excluding ID from object
  const { id, ...userData } = req.body ?? {};

  // Resources handle their own format validation and throw special
  // errors, that are in turn handled by a specific Express middleware
  const su = await new ShopUser(userData).save(id);

  return res.json(su.attributes);
};
