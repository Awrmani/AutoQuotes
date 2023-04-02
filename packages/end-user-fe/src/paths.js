const login = () => ({ pathname: '/login' });

const registration = () => ({ pathname: '/registration' });

const profile = () => ({
  pathname: `/profile`,
});

const quotingPage = ({ quoteId = 'new' } = { quoteId: ':quoteId' }) => ({
  pathname: `/quotingPage/${quoteId}`,
});

const about = () => ({
  pathname: '/about',
});

const appointment = () => ({
  pathname: '/appointment',
});

const emailConfirmation = () => ({
  pathname: '/confirmEmail/:userId/:key/:quoteId?',
});

const confirmingEmail = () => ({
  pathname: '/confirmEmailSent',
});

const userQuotes = () => ({
  pathname: '/quotes',
});

const paths = {
  login,
  about,
  registration,
  quotingPage,
  appointment,
  profile,
  emailConfirmation,
  confirmingEmail,
  userQuotes,
};

export default paths;
