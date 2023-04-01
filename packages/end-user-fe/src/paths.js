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
  pathname: '/confirmEmail/:userId/:key',
});

const confirmingEmail = () => ({
  pathname: '/confirmEmail',
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
