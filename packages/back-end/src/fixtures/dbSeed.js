/* eslint-disable no-console */

const Config = require('../resources/Config');
const configSeed = require('./configSeed.json');
const ShopUser = require('../resources/ShopUser');
const shopUserSeed = require('./shopUserSeed.json');

const SEED_MAP = {
  config: { Model: Config.ConfigModel, seed: configSeed },
  shopUser: { Model: ShopUser.ShopUserModel, seed: shopUserSeed },
};

/**
 * This async Fn decides if the current seed version in the DB is the
 * as the latest.
 *
 * @returns {Promise<boolean>}
 */
const getShouldSeed = async () => {
  const SEED_VERSION = SEED_MAP.config.seed[0].seedVersion;

  try {
    const config = await new Config().loadBy();
    if (config.attributes.seedVersion === SEED_VERSION) {
      console.log(
        `Seed version (${config.attributes.seedVersion}) is already at the latest`
      );
      return false;
    }

    console.log(
      `Seed version (${config.attributes.seedVersion}) is outdated, current one is ${SEED_VERSION}`
    );
    return true;
  } catch (e) {
    console.log(`DB has not been seeded, current one is ${SEED_VERSION}`);
    return true;
  }
};

/**
 * This async Fn seeds the DB if it's not using the latest seed.
 * !! All existing data is destroyed !!
 * as the latest.
 *
 * @returns {Promise}
 */
const dbSeed = async () => {
  if (!(await getShouldSeed())) return;

  /**
   * Seed config
   */
  console.log('### Running seeding process ###');

  // Using for of, because [].forEach is unable to `await`
  for (const collection of Object.keys(SEED_MAP)) {
    const { Model, seed } = SEED_MAP[collection];
    console.log(`# Seeding ${collection} with ${seed.length} documents #`);

    Model.deleteMany({});
    for (const document of seed) {
      // eslint-disable-next-line no-await-in-loop
      await new Model(document).save();
    }
  }
};

module.exports = dbSeed;
