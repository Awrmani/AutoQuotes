const { createToken } = require('../../utils/authentication');

module.exports = async (req, res) => {
  const { email, password } = req.body ?? {};

  // Todo recall and authenticate user
  if (email !== 'a@a.com' || password !== 'a') {
    return res.status(401).json({ error: 'Incorrect username or password' });
  }

  return res
    .status(200)
    .json({ token: createToken({ userId: '1', audience: 'shop' }) });
};
