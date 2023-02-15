const login = () => ({ pathname: '/login' });

const dashboard = () => ({
  pathname: '/dashboard',
});

const partList = () => ({
  pathname: '/partList',
});

const addPart = () => ({
  pathname: '/addPart',
});

const editPart = () => ({
  pathname: '/editPart',
});
const paths = { login, dashboard, addPart, partList, editPart };

export default paths;
