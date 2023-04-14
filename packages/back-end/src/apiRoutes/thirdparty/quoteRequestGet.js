const { omit } = require('lodash');
const ThirdPartyOfferRequest = require('../../resources/ThirdPartyOfferRequest');
const Quote = require('../../resources/Quote');
const VehicleType = require('../../resources/VehicleType');
const ServiceType = require('../../resources/ServiceType');

module.exports = async (req, res) => {
  const { supplierId, quoteId } = req.params;

  const promises = (
    await ThirdPartyOfferRequest.ThirdPartyOfferRequestModel.find(
      { quoteId, supplierIds: supplierId },
      ['_id']
    ).exec()
  ).map(({ id }) => new ThirdPartyOfferRequest().loadById(id.toString()));

  const offerRequestPromises = (await Promise.all(promises)).map(async obj => {
    const quote = await new Quote().loadById(obj.attributes.quoteId);

    const vehicleType = await new VehicleType().loadById(
      quote.attributes.vehicleTypeId
    );

    const serviceType = await new ServiceType().loadById(
      obj.attributes.serviceTypeId
    );

    return {
      ...omit(obj.attributes, ['supplierIds']),
      vehicleType: vehicleType.attributes,
      serviceType: serviceType.attributes,
    };
  });

  const offerRequests = await Promise.all(offerRequestPromises);

  return res.json(offerRequests);
};
