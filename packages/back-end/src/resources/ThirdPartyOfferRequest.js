const mongoose = require('mongoose');
const {
  arrayOfValidator,
} = require('@autoquotes/libraries/src/utils/validation');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const ResourceBase = require('./abstracts/ResourceBase');

const thirdPartyOfferRequestSchema = new mongoose.Schema(
  {
    quoteId: mongoose.Schema.Types.ObjectId,
    serviceTypeId: mongoose.Schema.Types.ObjectId,
    partName: String,
    supplierIds: [mongoose.Schema.Types.ObjectId],
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

const ThirdPartyOfferRequestModel = mongoose.model(
  'thirdPartyOfferRequest',
  thirdPartyOfferRequestSchema
);

const validatorConfig = {
  quoteId: [stringValidators.required],
  serviceTypeId: [stringValidators.required],
  partName: [stringValidators.required],
  supplierIds: [arrayOfValidator([stringValidators.isString])],
};

class ThirdPartyOfferRequest extends ResourceBase {
  constructor(attributes) {
    super({ Model: ThirdPartyOfferRequestModel, validatorConfig, attributes });
  }
}

module.exports = ThirdPartyOfferRequest;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ThirdPartySupplierModel = ThirdPartyOfferRequestModel;
