const mongoose = require('mongoose');
const ResourceBase = require('./abstracts/ResourceBase');

/**
 * This resource is to store basic application config, like
 * database seed version. There only ever will be one record
 * in this collection.
 *
 * Example usage:
 * const config = await new Config().loadBy();
 * console.log(config.attributes)
 */

const configSchema = new mongoose.Schema(
  {
    seedVersion: Number,
  },
  {
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

const ConfigModel = mongoose.model('config', configSchema);

const validatorConfig = {
  seedVersion: [],
};

class Config extends ResourceBase {
  constructor(attributes) {
    super({ Model: ConfigModel, validatorConfig, attributes });
  }
}

module.exports = Config;
module.exports.ConfigModel = ConfigModel;
