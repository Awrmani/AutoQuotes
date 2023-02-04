const mongoose = require('mongoose');
//const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const ResourceBase = require('./ResourceBase');

const appointmentSchema = new mongoose.Schema(
  {
    stall: Number,
    startTime: {
      type: Date,
      default: Date.now,
    },
    duration: Number,
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EndUser',
    },
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const AppointmentModel = mongoose.model('appointments', appointmentSchema);

const validatorConfig = {};

class Appointment extends ResourceBase {
  constructor(attributes) {
    super({ Model: AppointmentModel, validatorConfig, attributes });
  }
}

module.exports = Appointment;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.AppointmentModel = AppointmentModel;
