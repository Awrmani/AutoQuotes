const jwt = require('jsonwebtoken');
const { Strategy: CustomStrategy } = require('passport-custom');

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

  return `Bearer ${token}`;
};

const strategyFactory = ({ audience }) =>
  new CustomStrategy((req, callback) => {
    const { authorization } = req.headers ?? {};
    const token = authorization?.replace?.(/^Bearer /, '');

    if (!token) {
      callback('No token found', false);
      return;
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET ?? 'secret',
      {
        audience,
        issuer: process.env.DEPLOYMENT_NAME || 'AutoQuotes',
      },
      (error, decoded) => {
        if (error) {
          callback(error.message, false);
          return;
        }
        // Successfully authenticated.
        // TODO we may want to look the user up later
        callback(null, decoded);
      }
    );
  });

// passport.use('strategy-name');

module.exports = { createToken, strategyFactory };
