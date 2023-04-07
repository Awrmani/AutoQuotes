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

// Shop settings
const shopSettings = () => ({
  pathname: '/shopSettings',
});

// Appointment
const appointmentList = () => ({
  pathname: `/appointmentList`,
});

const appointmentDetails = ({ id = ':id' } = {}) => ({
  pathname: `/appointmentList/${id}`,
});

// Vehicle Types
const vehicleTypeList = () => ({
  pathname: `/vehicleTypeList`,
});

const addVehicleType = () => ({
  pathname: `/addVehicleType`,
});

const editVehicleType = ({ id = ':id' } = {}) => ({
  pathname: `/editVehicleType/${id}`,
});

// Suppliers
const supplierList = () => ({
  pathname: `/supplierList`,
});

const addSupplier = () => ({
  pathname: `/addSupplier`,
});

const editSupplier = ({ id = ':id' } = {}) => ({
  pathname: `/editSupplier/${id}`,
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
  serviceList,
  addService,
  editService,
  shopSettings,
  appointmentList,
  appointmentDetails,
  vehicleTypeList,
  addVehicleType,
  editVehicleType,
  supplierList,
  addSupplier,
  editSupplier,
};

export default paths;
