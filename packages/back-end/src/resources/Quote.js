const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const validatorFactory = require('@autoquotes/libraries/src/utils/validation');
const arrayValidators = require('@autoquotes/libraries/src/utils/validation/array');

const ResourceBase = require('./abstracts/ResourceBase');

/**
 * TODO
 * Represent the selection the end-user makes from available parts
 */

const quoteSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      ref: 'EndUser',
    },
    vehicleTypeId: {
      type: String,
      ref: 'VehicleType',
    },
    lineItems: [
      {
        _id: false,
        serviceTypeId: {
          type: String,
          ref: 'ServiceType',
        },
        parts: {
          type: [String],
          ref: 'Part',
        },
      },
    ],
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

const QuoteModel = mongoose.model('quotes', quoteSchema);

const validatorConfig = {
  customerId: [stringValidators.required],
  vehicleTypeId: [stringValidators.required],
  lineItems: [
    validatorFactory.arrayOfValidator(
      validatorFactory.subValidator({
        serviceTypeId: [stringValidators.isStringOrUndefined],
        parts: [arrayValidators.arrayOfStrings],
      })
    ),
  ],
};

class Quote extends ResourceBase {
  constructor(attributes) {
    super({ Model: QuoteModel, validatorConfig, attributes });
  }
}

module.exports = Quote;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.QuoteModel = QuoteModel;
