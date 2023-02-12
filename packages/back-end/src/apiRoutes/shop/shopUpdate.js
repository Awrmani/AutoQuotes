const Shop = require('../../resources/Shop');

module.exports = async (req, res) => {
  if (req.user.role !== 'admin') {
    return res
      .status(403)
      .json({ error: 'Only admin users can perform this operation' });
  }

  // There can only be one document in this collection
  const shop = await new Shop().loadBy({});
  // Validation is handled by the resource itself
  shop.update(req.body).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
