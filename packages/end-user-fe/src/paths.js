const login = () => ({ pathname: '/login' });

const registration = () => ({ pathname: '/registration' });

const profile = () => ({
  pathname: `/profile`,
});

const quotingPage = () => ({
  pathname: '/quotingPage',
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

const paths = {
  login,
  about,
  registration,
  quotingPage,
  appointment,
  profile,
  emailConfirmation,
  confirmingEmail,
};

export default paths;
