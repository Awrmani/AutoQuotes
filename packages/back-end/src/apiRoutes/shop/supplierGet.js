const ThirdPartySupplier = require('../../resources/ThirdPartySupplier');

module.exports = async (req, res) => {
  const { id } = req.params;

  if (req.user.role !== 'admin')
    return res
      .status(403)
      .json({ error: 'Only admin users can perform this operation' });

  const supplier = await new ThirdPartySupplier().loadById(id);

  return res.json({ id: supplier.attributes });
};