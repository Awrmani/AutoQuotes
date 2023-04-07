const ThirdPartySupplier = require('../../resources/ThirdPartySupplier');

module.exports = async (req, res) => {
  if (req.user.role !== 'admin')
    return res
      .status(403)
      .json({ error: 'Only admin users can perform this operation' });

  const promises = (
    await ThirdPartySupplier.ThirdPartySupplierModel.find({}, ['_id']).exec()
  ).map(({ id }) => new ThirdPartySupplier().loadById(id.toString()));

  const objects = (await Promise.all(promises)).map(obj => obj.attributes);

  return res.json(objects);
};
