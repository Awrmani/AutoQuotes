const login = () => ({ pathname: '/login' });

const dashboard = () => ({
  pathname: '/dashboard',
});

const partList = () => ({
  pathname: '/partList',
});

const addPartForm = () => ({
  pathname: '/addPartForm',
});

const editPartForm = () => ({
  pathname: 'editPartForm',
});
const paths = { login, dashboard, addPartForm, partList, editPartForm };

export default paths;
