const { createToken } = require('../../utils/authentication');
const ShopUser = require('../../resources/ShopUser');

module.exports = async (req, res) => {
  const { email, password } = req.body ?? {};

  if (typeof email !== 'string') {
    return res.status(417).json({ error: 'Email needs to be a string' });
  }

  let shopUser;
  try {
    shopUser = await new ShopUser(email);
  } catch (e) {
    return res.status(404).json({ error: 'Invalid user email' });
  }

  if (!shopUser.validatePassword(password))
    return res.status(401).json({ error: 'Incorrect password' });

  return res.status(200).json({
    token: createToken({ userId: shopUser.attributes.id, audience: 'shop' }),
  });
};
