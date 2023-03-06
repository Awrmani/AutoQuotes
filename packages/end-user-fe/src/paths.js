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

const paths = {
  login,
  about,
  registration,
  quotingPage,
  appointment,
  profile,
};

export default paths;
