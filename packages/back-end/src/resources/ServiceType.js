const mongoose = require('mongoose');
const stringValidators = require('@autoquotes/libraries/src/utils/validation/string');
const numberValidators = require('@autoquotes/libraries/src/utils/validation/number');
const {
  arrayOfValidator,
  subValidator,
} = require('@autoquotes/libraries/src/utils/validation');

const ResourceBase = require('./abstracts/ResourceBase');

const serviceTypeSchema = new mongoose.Schema(
  {
    name: String,
    timeInMinutes: Number,
    description: String,
    requiredParts: [
      {
        _id: false,
        name: String,
      },
    ],
    compatibleVehicles: [
      {
        _id: false,
        make: String,
        model: String,
        fromYear: Number,
        toYear: Number,
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

const ServiceTypeModel = mongoose.model('serviceTypes', serviceTypeSchema);

const validatorConfig = {
  name: [stringValidators.required],
  timeInMinutes: [numberValidators.required],
  description: [stringValidators.isString],
  requiredParts: arrayOfValidator([
    subValidator({
      name: [stringValidators.required],
    }),
  ]),
  compatibleVehicles: [
    arrayOfValidator([
      subValidator({
        make: [stringValidators.isString],
        model: [stringValidators.isString],
        fromYear: [numberValidators.isNumber],
        toYear: [numberValidators.isNumber],
      }),
    ]),
  ],
};

class ServiceType extends ResourceBase {
  constructor(attributes) {
    super({ Model: ServiceTypeModel, validatorConfig, attributes });
  }
}

module.exports = ServiceType;

// Exporting the model too so DB seed is able to truncate the collection
module.exports.ServiceTypeModel = ServiceTypeModel;
