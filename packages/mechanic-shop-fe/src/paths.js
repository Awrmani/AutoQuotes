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

const editPart = ({ id = ':id' } = {}) => ({
  pathname: `/editPart/${id}`,
});

const serviceList = () => ({
  pathname: '/serviceList',
});

const addService = () => ({
  pathname: '/addService',
});

const editService = ({ id = ':id' } = {}) => ({
  pathname: `/editService/${id}`,
});

const paths = {
  login,
  dashboard,
  partList,
  addPart,
  editPart,
  serviceList,
  addService,
  editService,
};

export default paths;
