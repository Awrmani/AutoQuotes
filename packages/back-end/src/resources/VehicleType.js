const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const ResourceBase = require('./abstracts/ResourceBase');

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
      type: Number,
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

const VehicleTypeModel = mongoose.model('vehicleTypes', vehicleTypeSchema);

const validatorConfig = {
  make: [stringValidators.required],
  model: [stringValidators.required],
  modelYear: [numberValidators.required],
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
