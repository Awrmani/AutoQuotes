const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const ResourceBase = require('./ResourceBase');

const vehicleTypeSchema = new mongoose.Schema(
  {
    make: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    modelYear: {
      type: String,
      required: true,
    },
    engineVariant: {
      type: String,
      required: true,
    },
    bodyType: {
      type: String,
      required: true,
    },
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const VehicleTypeModel = mongoose.model('vehicleTypes', vehicleTypeSchema);

const validatorConfig = {
  make: [stringValidators.required],
  model: [stringValidators.required],
  modelYear: [stringValidators.required],
  engineVariant: [stringValidators.required],
  bodyType: [stringValidators.required],
};

class VehicleType extends ResourceBase {
  constructor(attributes) {
    super({ Model: VehicleTypeModel, validatorConfig, attributes });
  }
}

module.exports = VehicleType;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.VehicleTypeModel = VehicleTypeModel;
