const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
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
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'VehicleType',
    },
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const PartModel = mongoose.model('parts', partSchema);

const validatorConfig = {
  name: [stringValidators.required],
  price: [stringValidators.required],
};

class Part extends ResourceBase {
  constructor(attributes) {
    super({ Model: PartModel, validatorConfig, attributes });
  }
}

module.exports = Part;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.PartModel = PartModel;
