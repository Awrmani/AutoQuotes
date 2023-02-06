const mongoose = require('mongoose');
const ResourceBase = require('./ResourceBase');

const quoteSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'EndUser',
      required: true,
    },
    vehicleType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'VehicleType',
      required: true,
    },
    appointment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true,
    },
    quotes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'QuoteLineItem',
    },
  },
  {
    // Auto handle createdAt, updatedAt in ISO8601 format
    timestamps: true,
  }
);

const QuoteModel = mongoose.model('quotes', quoteSchema);

const validatorConfig = {};

class Quote extends ResourceBase {
  constructor(attributes) {
    super({ Model: QuoteModel, validatorConfig, attributes });
  }
}

module.exports = Quote;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.QuoteModel = QuoteModel;
