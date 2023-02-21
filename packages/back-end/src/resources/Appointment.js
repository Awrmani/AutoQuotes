const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const ResourceBase = require('./ResourceBase');

const appointmentSchema = new mongoose.Schema(
  {
    stall: Number,
    startsAt: {
      type: Date,
      default: Date.now,
    },
    duration: Number,
    customerId: {
      type: String,
      ref: 'EndUser',
    },
    quoteId: {
      type: String,
      ref: 'Quote',
    },
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

const AppointmentModel = mongoose.model('appointments', appointmentSchema);

const validatorConfig = {
  stall: [numberValidators.required],
  startsAt: [stringValidators.required, stringValidators.iso8601],
  duration: [numberValidators.required],
  customerId: [stringValidators.required],
  quoteId: [stringValidators.required],
};

class Appointment extends ResourceBase {
  constructor(attributes) {
    super({ Model: AppointmentModel, validatorConfig, attributes });
  }
}

module.exports = Appointment;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.AppointmentModel = AppointmentModel;
