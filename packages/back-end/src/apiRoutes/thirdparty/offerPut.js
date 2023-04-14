const ThirdPartyOfferRequest = require('../../resources/ThirdPartyOfferRequest');
const Part = require('../../resources/Part');
const Shop = require('../../resources/Shop');
const Quote = require('../../resources/Quote');
const VehicleType = require('../../resources/VehicleType');
const EndUser = require('../../resources/EndUser');
const ServiceType = require('../../resources/ServiceType');
const mailer = require('../../resources/Mailer');

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

  const serviceType = await new ServiceType().loadById(
    offerRequest.attributes.serviceTypeId
  );

  const endUser = await new EndUser().loadById(quote.attributes.customerId);

  // Add offer to Parts collection
  const partId = await new Part({
    name: offerRequest.attributes.partName,
    description,
    manufacturer,
    type,
    warrantyMonths,
    price: price * (shop.attributes.partMarkupPercent / 100),
    amountInStock: 1,
    compatibleVehicles: [
      {
        make: vehicleType.attributes.make,
        model: vehicleType.attributes.model,
        fromYear: vehicleType.attributes.modelYear,
        toYear: vehicleType.attributes.modelYear,
      },
    ],
    supplierId,
    offerExpiration,
    exclusiveQuoteId: quote.attributes.id,
  }).save();

  // Notify user

  const subject = `${shop.attributes.name} - New part offer arrived`;
  const href = [
    process.env.END_USER_URL,
    'quotingPage',
    quote.attributes.id,
  ].join('/');

  const html = `
    <html>
      <body>
        Dear ${endUser.attributes.name}!<br>
        <br>
        A new part offer has arrived for your ${
          vehicleType.attributes.modelYear
        } ${vehicleType.attributes.make} ${vehicleType.attributes.model} ${
    vehicleType.attributes.engineVariant
  } ${vehicleType.attributes.bodyType}<br>
        <br>
        Service: ${serviceType.attributes.name}<br>
        Part name: ${offerRequest.attributes.partName}<br>
        Description: ${description}<br>
        Manufacturer: ${manufacturer}<br>
        Type: ${type}<br>
        Warranty: ${warrantyMonths} months<br>
        Offer expires at: ${new Date(offerExpiration).toLocaleDateString(
          'en-US',
          { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
        )}<br>
        <br>
        Please click
        <a href="${href}"><b>here</b></a> to view your quote<br>
        <br>
        Kind Regards,<br>
        ${shop.attributes.name} Team
      <body>
    </html>
  `;

  await mailer.send({ to: endUser.attributes.email, subject, html });

  return res.json({ partId });
};
