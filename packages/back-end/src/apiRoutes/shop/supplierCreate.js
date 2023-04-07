const ThirdPartySupplier = require('../../resources/ThirdPartySupplier');
const FieldValidationError = require('../../resources/errors/FieldValidationError');

module.exports = async (req, res) => {
  if (req.user.role !== 'admin')
    return res
      .status(403)
      .json({ error: 'Only admin users can perform this operation' });

  // Excluding ID from object
  const { id, ...data } = req.body ?? {};

  try {
    await new ThirdPartySupplier().loadBy({ email: data.email });
    throw new FieldValidationError({ email: 'This email already exists' });
  } catch (e) {
    // This is expected
  }

  try {
    await new ThirdPartySupplier().loadBy({ name: data.name });
    throw new FieldValidationError({ name: 'This supploer already exists' });
  } catch (e) {
    // This is expected
  }

  // Resources handle their own format validation and throw special
  // errors, that are in turn handled by a specific Express middleware
  await new ThirdPartySupplier(data).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
