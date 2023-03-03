const { v4: uuid } = require('uuid');
const EndUser = require('../../resources/EndUser');

module.exports = async (req, res) => {
  const { id: ignoredId, email, ...rest } = req.body ?? {};

  try {
    await new EndUser().loadBy({ email });
    return res.status(409).json({ error: 'Email already in use' });
  } catch (e) {
    // Since we were unable to recall user with that email, the email is available
    // This is the expected "happy path"
  }

  const endUser = new EndUser({
    ...rest,
    email,
    isVerified: false,
    verificationCode: uuid(),
  });

  // TODO send confirmation email with the key endUser.attributes.verificationCode

  const id = await endUser.save();
  return res.json({ id });
};
