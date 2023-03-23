const mongoose = require('mongoose');
const { DateTime } = require('luxon');
const { DAYS } = require('@autoquotes/libraries/src/constants/days');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const openingHoursValidator = require('@autoquotes/libraries/src/utils/validation/openingHours');
const ResourceBase = require('./abstracts/ResourceBase');

const shopSchema = new mongoose.Schema(
  {
    name: String,
    logo: String,
    slogan: String,
    email: String,
    phone: String,
    // IANA timezone, like 'Canada/Eastern'
    // https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
    timezone: String,
    openingHours: {
      _id: false,
      monday: {
        _id: false,
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      tuesday: {
        _id: false,
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      wednesday: {
        _id: false,
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      thursday: {
        _id: false,
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      friday: {
        _id: false,
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      saturday: {
        _id: false,
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
      sunday: {
        _id: false,
        openHour: Number,
        openMinute: Number,
        closeHour: Number,
        closeMinute: Number,
      },
    },
    numberOfStalls: Number,
    returnPolicyUrl: String,
    termsAndConditionsUrl: String,
    privacyPolicyUrl: String,
    address1: String,
    address2: String,
    zip: String,
    city: String,
    state: String,
    country: String,
    hourlyPriceOfLabour: Number,
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
    toJSON: {
      // Map _id over to id and stringify
      transform(doc, ret) {
        // eslint-disable-next-line no-param-reassign
        ret.id = ret._id.toString();
        // eslint-disable-next-line no-param-reassign
        delete ret._id;
      },
    },
  }
);

const ShopModel = mongoose.model('shop', shopSchema);

const validatorConfig = {
  name: [stringValidators.required],
  logo: [stringValidators.isString],
  slogan: [stringValidators.required],
  email: [stringValidators.required, stringValidators.email],
  phone: [stringValidators.required],
  timezone: [stringValidators.required],
  openingHours: [openingHoursValidator.openingHours],
  numberOfStalls: [numberValidators.required],
  returnPolicyUrl: [stringValidators.required],
  termsAndConditionsUrl: [stringValidators.required],
  privacyPolicyUrl: [stringValidators.required],
  address1: [stringValidators.required],
  address2: [stringValidators.isString],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
  hourlyPriceOfLabour: [numberValidators.required],
};

class Shop extends ResourceBase {
  constructor(attributes) {
    super({ Model: ShopModel, validatorConfig, attributes });
  }

  getOpeningHoursForDate(date) {
    const incomingDt = DateTime.fromISO(date);

    if (!incomingDt.isValid)
      throw new Error(`Invalid time: ${incomingDt.invalidReason}`);

    const incomingDtShopTz = incomingDt.setZone(this.attributes.timezone);

    if (!incomingDtShopTz.isValid)
      throw new Error(`Invalid time: ${incomingDtShopTz.invalidReason}`);

    // ES2015 guarantees array order equals object key insertion order when the key is a string
    const dayName = Object.values(DAYS)[incomingDtShopTz.weekday - 1];
    const openingHoursForDay = this.attributes.openingHours[dayName];

    if (
      typeof openingHoursForDay?.openHour !== 'number' ||
      typeof openingHoursForDay?.openMinute !== 'number' ||
      typeof openingHoursForDay?.closeHour !== 'number' ||
      typeof openingHoursForDay?.closeMinute !== 'number'
    ) {
      return { dayName, isOpen: false };
    }

    const openDate = incomingDtShopTz
      .set({
        hour: openingHoursForDay.openHour,
        minute: openingHoursForDay.openMinute,
        second: 0,
        millisecond: 0,
      })
      .toJSDate();

    const closeDate = incomingDtShopTz
      .set({
        hour: openingHoursForDay.closeHour,
        minute: openingHoursForDay.closeMinute,
        second: 0,
        millisecond: 0,
      })
      .toJSDate();

    // Return ISO format, **with correct tz set**
    return { dayName, openingHoursForDay, isOpen: true, openDate, closeDate };
  }
}

module.exports = Shop;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ShopModel = ShopModel;
