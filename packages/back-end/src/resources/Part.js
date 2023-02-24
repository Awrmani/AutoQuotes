const mongoose = require('mongoose');
const {
  arrayOfValidator,
  subValidator,
} = require('@autoquotes/libraries/src/utils/validation');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const ResourceBase = require('./abstracts/ResourceBase');

const partSchema = new mongoose.Schema(
  {
    name: String,
    description: String,
    manufacturer: String,
    type: {
      type: String,
      enum: ['OEM', 'OE', 'Aftermarket'],
    },
    warrantyMonths: Number,
    price: Number, // If it cames from a supplier offer, it already contains markup
    amountInStock: Number,
    compatibleVehicles: [
      {
        _id: false,
        make: String,
        model: String,
        fromYear: Number,
        toYear: Number,
      },
    ],
    supplierId: String, // only if this is an offer
    offerExpiration: Date, // only if this is an offer
    exclusiveQuoteId: String, // A supplier offer is for a specific quote
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
  description: [stringValidators.isStringOrUndefined],
  manufacturer: [stringValidators.isStringOrUndefined],
  type: [
    stringValidators.required,
    stringValidators.oneOf(['OEM', 'OE', 'Aftermarket']),
  ],
  warrantyMonths: [numberValidators.required],
  price: [numberValidators.required],
  amountInStock: [numberValidators.required],
  compatibleVehicles: [
    arrayOfValidator([
      subValidator({
        make: [stringValidators.required],
        model: [stringValidators.required],
        fromYear: [numberValidators.required],
        toYear: [numberValidators.required],
      }),
    ]),
  ],
  supplierId: [stringValidators.isStringOrUndefined],
  offerExpiration: [stringValidators.iso8601],
  exclusiveQuoteId: [stringValidators.isStringOrUndefined],
};

class Part extends ResourceBase {
  constructor(attributes) {
    super({ Model: PartModel, validatorConfig, attributes });
  }
}

module.exports = Part;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.PartModel = PartModel;
