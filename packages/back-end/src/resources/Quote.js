const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const validatorFactory = require('@autoquotes/libraries/src/utils/validation');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const booleanValidators = require('@autoquotes/libraries/src/utils/validation/boolean');

const ResourceBase = require('./abstracts/ResourceBase');

/**
 * `selectedPartIds` represent the selection the end-user makes from available parts
 * If a quote is confirmed (an appointment is added with it's ID) it can no longer be
 * edited by any party, also all required parts should be listed in `selectedPartIds`
 * for each individual package
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
        // AKA. package
        serviceTypeId: {
          type: String,
          ref: 'ServiceType',
        },
        // To leave a paper trail (persist these in case of part changes) we copy the original
        // part details here once a selection has been made by the end-user
        selectedParts: [
          {
            _id: false,
            id: {
              type: String,
              ref: 'Part',
            },
            name: String,
            description: String,
            manufacturer: String,
            type: {
              type: String,
              enum: ['OEM', 'OE', 'Aftermarket'],
            },
            warrantyMonths: Number,
            price: Number, // If it cames from a supplier offer, it already contains markup
            supplierId: String, // only if this is an offer
          },
        ],
      },
    ],
    isFinalized: Boolean,
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
  customerId: [stringValidators.isStringOrUndefined],
  vehicleTypeId: [stringValidators.required],
  lineItems: [
    validatorFactory.arrayOfValidator(
      validatorFactory.subValidator({
        serviceTypeId: [stringValidators.isStringOrUndefined],
        selectedParts: validatorFactory.nullableArrayOfValidator(
          validatorFactory.subValidator({
            id: [stringValidators.required],
            name: [stringValidators.required],
            description: [stringValidators.isStringOrUndefined],
            manufacturer: [stringValidators.isStringOrUndefined],
            type: [
              stringValidators.required,
              stringValidators.oneOf(['OEM', 'OE', 'Aftermarket']),
            ],
            warrantyMonths: [numberValidators.required],
            price: [numberValidators.required],
            supplierId: [stringValidators.isStringOrUndefined],
          })
        ),
      })
    ),
  ],
  isFinalized: [booleanValidators.isBoolean],
};

class Quote extends ResourceBase {
  constructor(attributes) {
    super({ Model: QuoteModel, validatorConfig, attributes });
  }
}

module.exports = Quote;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.QuoteModel = QuoteModel;
