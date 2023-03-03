const login = () => ({ pathname: '/login' });

const dashboard = () => ({
  pathname: '/dashboard',
});

// Part paths

const partList = () => ({
  pathname: '/partList',
});

const addPart = () => ({
  pathname: '/addPart',
});

const editPart = ({ id = ':id' } = {}) => ({
  pathname: `/editPart/${id}`,
});

// Service paths

const serviceList = () => ({
  pathname: '/serviceList',
});

const addService = () => ({
  pathname: '/addService',
});

const editService = ({ id = ':id' } = {}) => ({
  pathname: `/editService/${id}`,
});

// Shop User Paths
const userList = () => ({
  pathname: '/userList',
});

const addUser = () => ({
  pathname: '/addUser',
});

const editUser = ({ id = ':id' } = {}) => ({
  pathname: `/editUser/${id}`,
});

const userProfile = ({ id = ':id' } = {}) => ({
  pathname: `/userProfile/${id}`,
});

// Shop settings
const shopSettings = () => ({
  pathname: '/shopSettings',
});

const paths = {
  login,
  dashboard,
  addPart,
  partList,
  editPart,
  userList,
  addUser,
  editUser,
  userProfile,
  serviceList,
  addService,
  editService,
  shopSettings,
};

export default paths;
