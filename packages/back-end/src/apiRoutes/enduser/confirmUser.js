const { createToken } = require('../../utils/authentication');
const EndUser = require('../../resources/EndUser');

module.exports = async (req, res) => {
  const { id } = req.params;
  const { verificationCode } = req.body ?? {};

  let enduser;
  try {
    enduser = await new EndUser().loadById(id);
  } catch (e) {
    return res.status(409).json({ error: 'Incorrect userId' });
  }

  if (enduser.attributes.isVerified)
    return res.status(409).json({ error: 'User already verified' });

  if (enduser.attributes.verificationCode !== verificationCode)
    return res.status(403).json({ error: 'Incorrect verification code' });

  enduser.update({ isVerified: true, verificationCode: '' });

  await enduser.save();

  // log the user in
  return res.status(200).json({
    token: createToken({ userId: enduser.attributes.id, audience: 'enduser' }),
  });
};
