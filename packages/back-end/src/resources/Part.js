const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const arrayValidators = require('@autoquotes/libraries/src/utils/validation/array');
const ResourceBase = require('./ResourceBase');

const partSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    amountInStock: {
      type: Number,
    },
    compatibleVehicles: {
      type: [String],
      ref: 'VehicleType',
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

const PartModel = mongoose.model('parts', partSchema);

const validatorConfig = {
  name: [stringValidators.required],
  price: [numberValidators.required],
  amountInStock: [numberValidators.required],
  compatibleVehicles: [arrayValidators.isArray],
};

class Part extends ResourceBase {
  constructor(attributes) {
    super({ Model: PartModel, validatorConfig, attributes });
  }
}

module.exports = Part;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.PartModel = PartModel;
