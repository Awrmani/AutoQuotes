const ThirdPartyOfferRequest = require('../../resources/ThirdPartyOfferRequest');
const Part = require('../../resources/Part');
const Shop = require('../../resources/Shop');
const Quote = require('../../resources/Quote');
const VehicleType = require('../../resources/VehicleType');

module.exports = async (req, res) => {
  const { supplierId, partRequestId } = req.params;
  const {
    description = '',
    manufacturer = '',
    type,
    warrantyMonths,
    price,
    offerExpiration,
  } = req.body ?? {};

  const shop = await new Shop().loadBy({});

  const offerRequest = await new ThirdPartyOfferRequest().loadById(
    partRequestId
  );

  const quote = await new Quote().loadById(offerRequest.attributes.quoteId);

  const vehicleType = await new VehicleType().loadById(
    quote.attributes.vehicleTypeId
  );

  // Add offer to Parts collection
  const partId = await new Part({
    name: offerRequest.attributes.partName,
    description,
    manufacturer,
    type,
    warrantyMonths,
    price: price * (shop.attributes.partMarkupPercent / 100),
    amountInStock: 0,
    compatibleVehicles: [
      {
        make: vehicleType.attributes.make,
        model: vehicleType.attributes.model,
        fromYear: vehicleType.attributes.modelYear,
        toYear: vehicleType.attributes.modelYear,
      },
    ],
    supplierId,
    offerExpiration: new Date(offerExpiration),
    exclusiveQuoteId: quote.attributes.id,
  }).save();

  return res.json({ partId });
};
