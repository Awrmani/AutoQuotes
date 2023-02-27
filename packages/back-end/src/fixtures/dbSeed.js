/* eslint-disable no-console */

const Config = require('../resources/Config');
const configSeed = require('./configSeed.json');
const ShopUser = require('../resources/ShopUser');
const shopUserSeed = require('./shopUserSeed.json');
const Part = require('../resources/Part');
const partSeed = require('./partSeed.json');
const VehicleType = require('../resources/VehicleType');
const vehicleTypeSeed = require('./vehicleTypeSeed.json');
const Shop = require('../resources/Shop');
const shopSeed = require('./shopSeed.json');
const EndUser = require('../resources/EndUser');
const endUserSeed = require('./endUserSeed.json');
const ServiceType = require('../resources/ServiceType');
const serviceTypeSeed = require('./serviceTypeSeed.json');
const Quote = require('../resources/Quote');
const quoteSeed = require('./quoteSeed.json');
const Appointment = require('../resources/Appointment');
const appointmentSeed = require('./appointmentSeed.json');

const SEED_MAP = {
  config: {
    Model: Config.ConfigModel,
    Resource: Config,
    seed: configSeed,
  },
  shop: {
    Model: Shop.ShopModel,
    Resource: Shop,
    seed: shopSeed,
  },
  shopUser: {
    Model: ShopUser.ShopUserModel,
    Resource: ShopUser,
    seed: shopUserSeed,
  },
  vehicleType: {
    Model: VehicleType.VehicleTypeModel,
    Resource: VehicleType,
    seed: vehicleTypeSeed,
  },
  part: {
    Model: Part.PartModel,
    Resource: Part,
    seed: partSeed,
  },
  endUser: {
    Model: EndUser.EndUserModel,
    Resource: EndUser,
    seed: endUserSeed,
  },
  serviceType: {
    Model: ServiceType.ServiceTypeModel,
    Resource: ServiceType,
    seed: serviceTypeSeed,
  },
  quote: {
    Model: Quote.QuoteModel,
    Resource: Quote,
    seed: quoteSeed,
  },
  appointment: {
    Model: Appointment.AppointmentModel,
    Resource: Appointment,
    seed: appointmentSeed,
  },
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
const dbSeed = async ({ force } = {}) => {
  if (!force && !(await getShouldSeed())) return;

  /**
   * Seed config
   */
  console.log('### Running seeding process ###');

  // Using for of, because [].forEach is unable to `await`
  for (const collection of Object.keys(SEED_MAP)) {
    const { Model, Resource, seed } = SEED_MAP[collection];
    console.log(`# Seeding ${collection} with ${seed.length} documents #`);

    // eslint-disable-next-line no-await-in-loop
    await Model.deleteMany({});
    for (const document of seed) {
      // eslint-disable-next-line no-await-in-loop
      await new Resource(document).save();
    }
  }
};

module.exports = dbSeed;
