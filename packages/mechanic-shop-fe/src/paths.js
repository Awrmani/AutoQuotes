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

const userList = () => ({
  pathname: '/userList',
});

const addUser = () => ({
  pathname: '/addUser',
});

const editUser = ({ id = ':id' } = {}) => ({
  pathname: `/editUser/'${id}`,
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
};

export default paths;
