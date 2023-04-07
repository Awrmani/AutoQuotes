const { createToken } = require('../../utils/authentication');
const EndUser = require('../../resources/EndUser');

module.exports = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== 'string') {
    return res.status(417).json({ error: 'Email needs to be a string' });
  }

  let enduser;
  try {
    enduser = await new EndUser().loadBy({ email });
  } catch (e) {
    return res.status(404).json({ error: 'Invalid user email' });
  }

  if (!enduser.validatePassword(password))
    return res.status(401).json({ error: 'Incorrect password' });

  if (!enduser.attributes.isVerified)
    return res
      .status(401)
      .json({ error: 'Please verify your email address first' });

  return res.status(200).json({
    token: createToken({
      userId: enduser.attributes.id,
      audience: 'enduser',
    }),
  });
};
