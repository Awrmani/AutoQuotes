/* eslint-disable no-console */

const Config = require('../resources/Config');
const ShopUser = require('../resources/ShopUser');

const SEED_VERSION = 1;

const getShouldSeed = async () => {
  try {
    const config = await new Config().loadBy();
    if (config.attributes.seedVersion === SEED_VERSION) {
      console.log(
        `Seed version (${config.attributes.seedVersion}) is already at the latest`
      );
      return false;
    }

    console.log(`Seed version (${config.attributes.seedVersion}) is outdated`);
    return true;
  } catch (e) {
    console.log('DB has not been seeded');
    return true;
  }
};

const dbSeed = async () => {
  if (!(await getShouldSeed())) return;

  /**
   * Seed config
   */
  console.log(`Running seed version ${SEED_VERSION}`);
  await Config.ConfigModel.deleteMany({});
  await new Config({ seedVersion: SEED_VERSION }).save();

  /**
   * Seed shop users
   */
  await ShopUser.ShopUserModel.deleteMany({});

  await new ShopUser({
    firstName: 'John',
    lastName: 'Doe',
    email: 'jd1@a.com',
    password: 'secret',
  }).save();
};

module.exports = dbSeed;
