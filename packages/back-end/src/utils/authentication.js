const jwt = require('jsonwebtoken');

const createToken = ({ userId, audience, customClaimPayload }) => {
  const token = jwt.sign(
    {
      autoquotesClaim: customClaimPayload ?? {},
    },
    process.env.JWT_SECRET ?? 'secret',
    {
      expiresIn: '30 days',
      audience,
      issuer: process.env.DEPLOYMENT_NAME || 'AutoQuotes',
      subject: userId,
    }
  );

  return token;
};

const authenticatorFactory =
  ({ audience, UserClass, optional }) =>
  async (req, res, next) => {
    const { authorization } = req.headers ?? {};

    if (optional && !authorization) next();

    const token = authorization?.replace?.(/^Bearer /, '');

    if (!token) return res.status(401).json({ error: 'No token found' });

    new Promise((resolve, reject) => {
      // Converting jwt.verify to a promise interface
      jwt.verify(
        token,
        process.env.JWT_SECRET ?? 'secret',
        {
          audience,
          issuer: process.env.DEPLOYMENT_NAME || 'AutoQuotes',
        },
        (error, decoded) => {
          if (error) {
            reject(error.message);
            return;
          }
          resolve(decoded);
        }
      );
    })
      // Promises automatically await in a promise chain
      .then(({ sub }) => new UserClass().loadById(sub))
      .then(user => {
        // Successfully authenticated.
        req.user = user.attributes;
        next();
      })
      .catch(e => {
        return res.status(401).json({ error: 'User not found' });
      });
    return undefined;
  };

module.exports = { authenticatorFactory, createToken };
