const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const validatorFactory = require('@autoquotes/libraries/src/utils/validation');

const ResourceBase = require('./ResourceBase');

const quoteSchema = new mongoose.Schema(
  {
    customerId: {
      type: String,
      ref: 'EndUser',
      required: true,
    },
    vehicleTypeId: {
      type: String,
      ref: 'VehicleType',
      required: true,
    },
    appointmentId: {
      type: String,
      ref: 'Appointment',
      required: true,
    },
    lineItems: [
      {
        supplierOfferId: {
          type: String,
          ref: 'SupplierOffer',
        },
        serviceType: {
          type: String,
          ref: 'ServiceType',
        },
        parts: {
          type: [String],
          ref: 'Part',
        },
        duration: Number,
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
  appointmentId: [stringValidators.required],
  lineItems: [
    validatorFactory.arrayOf(
      validatorFactory.subValidator({
        supplierOfferId: [stringValidators.isStringOrUndefined],
        serviceType: [stringValidators.isStringOrUndefined],
        parts: [],
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
