const nodemailer = require('nodemailer');

class Mailer {
  #sender;

  #transporter;

  configure = ({ host, port, user, pass, sender }) => {
    if (!host || !user || !pass || !sender) {
      this.#sender = null;
      this.#transporter = null;

      // eslint-disable-next-line no-console
      console.log(
        'Missing SMTP config, switching to DRY MODE. Messages will be printed to console only'
      );

      return;
    }

    this.#sender = sender;
    this.#transporter = nodemailer.createTransport({
      host,
      port: port || 25,
      secure: port === 465,
      auth: { user, pass },
    });

    // eslint-disable-next-line no-console
    console.log('SMTP transport configured');
  };

  send = ({ to, subject, text, html }) => {
    if (!this.#transporter) {
      // eslint-disable-next-line no-console
      console.log(`DRY MODE - dumping content`, { to, subject, text, html });
      return undefined;
    }

    return this.#transporter
      .sendMail({
        from: this.#sender,
        to,
        subject,
        text,
        html,
      })
      .catch(e => {
        // eslint-disable-next-line no-console
        console.error('Failed to send email', e);
      });
  };
}

module.exports = new Mailer();
