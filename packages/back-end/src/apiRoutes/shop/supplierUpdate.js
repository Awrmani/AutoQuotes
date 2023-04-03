const ThirdPartySupplier = require('../../resources/ThirdPartySupplier');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { id: _, ...patchWith } = req.body;

  if (req.user.role !== 'admin')
    return res
      .status(403)
      .json({ error: 'Only admin users can perform this operation' });

  const supplier = await new ThirdPartySupplier().loadById(id);

  await supplier.update(patchWith).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
