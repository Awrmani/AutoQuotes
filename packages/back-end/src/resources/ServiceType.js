const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const ResourceBase = require('./ResourceBase');

const serviceTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    time: Number,
    description: String,
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const ServiceTypeModel = mongoose.model('serviceTypes', serviceTypeSchema);

const validatorConfig = {
  type: [stringValidators.required],
  time: [numberValidators.required],
  description: [stringValidators.required],
};

class ServiceType extends ResourceBase {
  constructor(attributes) {
    super({ Model: ServiceTypeModel, validatorConfig, attributes });
  }
}

module.exports = ServiceType;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ServiceTypeModel = ServiceTypeModel;
