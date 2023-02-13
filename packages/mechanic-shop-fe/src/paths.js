const login = () => ({ pathname: '/login' });

const dashboard = () => ({
  pathname: '/dashboard',
});

const inventory = () => ({
  pathname: '/inventory',
});

const itemForm = () => ({
  pathname: '/itemForm',
});

const SingleItemView = () => ({
  pathname: '/item',
});

const paths = { login, dashboard, inventory, itemForm, SingleItemView };

export default paths;
