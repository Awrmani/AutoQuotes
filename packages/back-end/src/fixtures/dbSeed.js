const ShopUser = require('../resources/ShopUser');

const dbSeed = async () => {
  ShopUser.ShopUserModel.deleteMany({});

  await new ShopUser({
    firstName: 'John',
    lastName: 'Doe',
    email: 'jd1@a.com',
    password: 'secret',
  }).save();
};

module.exports = dbSeed;
