const { v4: uuid } = require('uuid');
const EndUser = require('../../resources/EndUser');
const mailer = require('../../resources/Mailer');
const Shop = require('../../resources/Shop');

module.exports = async (req, res) => {
  const { id: ignoredId, email, quoteId, ...rest } = req.body ?? {};

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

  const id = await endUser.save();

  // Send confirmation email with the key
  const shop = await new Shop().loadBy({});
  const subject = `${shop.attributes.name} - Confirmation email`;
  const href = [
    process.env.END_USER_URL,
    'confirmEmail',
    id,
    endUser.attributes.verificationCode,
    ...(quoteId ? [quoteId] : []),
  ].join('/');

  const html = `
    <html>
      <body>
        Dear ${endUser.attributes.name}!<br>
        <br>
        Please click
        <a href="${href}"><b>here</b></a> to confirm your account<br>
        <br>
        Kind Regards,<br>
        ${shop.attributes.name} Team
      <body>
    </html>
  `;

  await mailer.send({ to: email, subject, html });

  return res.json({ id });
};
