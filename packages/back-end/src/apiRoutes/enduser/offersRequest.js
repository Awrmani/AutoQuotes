const loadQuote = require('../../utils/loadQuote');
const listCompatiblePartsForQuoteServiceType = require('../../utils/listCompatiblePartsForQuoteServiceType');
const ThirdPartySupplier = require('../../resources/ThirdPartySupplier');
const ThirdPartyOfferRequest = require('../../resources/ThirdPartyOfferRequest');
const Shop = require('../../resources/Shop');
const VehicleType = require('../../resources/VehicleType');
const ServiceType = require('../../resources/ServiceType');
const mailer = require('../../resources/Mailer');

const getPartsOffersNeeded = async ({ quoteId, lineItems, vehicleTypeId }) => {
  const partsOffersNeeded = [];

  const lineItemPromises = lineItems.map(async lineItem => {
    const { serviceTypeId } = lineItem;

    const compatibleParts = await listCompatiblePartsForQuoteServiceType({
      quoteId,
      serviceTypeId,
      vehicleTypeId,
    });

    // Map over all the required parts push those to partsOffersNeeded which require it
    await Promise.all(
      compatibleParts.map(async ({ name, options }) => {
        if (options?.length) return;

        const serviceType = await new ServiceType().loadById(serviceTypeId);

        partsOffersNeeded.push({ serviceType: serviceType.attributes, name });
      })
    );
  });

  await Promise.all(lineItemPromises);

  return partsOffersNeeded;
};

const createEmailBody = ({
  supplier,
  vehicleType,
  shop,
  partsOffersNeeded,
  href,
}) => {
  const partows = partsOffersNeeded.map(
    ({ serviceType, name }) =>
      `<tr><td>${serviceType.name}</td><td>${name}</td></tr>`
  );

  const html = `
    <html>
      <body>
        Dear ${supplier.name}!<br>
        <br>
        We would like to provide a quote to a customer, and would like to ask for offers regarding the following vehicle:<br>
        ${vehicleType.modelYear} ${vehicleType.make} ${vehicleType.model} ${
    vehicleType.engineVariant
  } ${vehicleType.bodyType}<br>
        <br>
        We would need the the following part(s):<br>
        <br>
        <table border="1" cellpadding="4">
          <thead>
            <tr>
              <th>Service</th>
              <th>Part</th>
            </tr>
          </thead>
          <tbody>
            ${partows.join('\n')}
          </tbody>
        </table>
        <br />
        Please click
        <a href="${href}"><b>here</b></a> to provide an offer to *any* of the above parts<br>
        <br>
        Kind Regards,<br>
        ${shop.name} Team
      <body>
    </html>
  `;

  return html;
};

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;

  const quote = await loadQuote({ customerId, quoteId });

  const partsOffersNeeded = await getPartsOffersNeeded({
    quoteId,
    lineItems: quote.attributes.lineItems,
    vehicleTypeId: quote.attributes.vehicleTypeId,
  });

  if (!partsOffersNeeded.length)
    return res
      .status(409)
      .json({ error: 'All required parts are available, please refresh page' });

  const shop = await new Shop().loadBy({});

  const vehicleType = await new VehicleType().loadById(
    quote.attributes.vehicleTypeId
  );

  // Load all 3rd party suppliers
  const promises = (
    await ThirdPartySupplier.ThirdPartySupplierModel.find({}, ['_id']).exec()
  ).map(({ id }) => new ThirdPartySupplier().loadById(id.toString()));

  const suppliers = (await Promise.all(promises)).map(obj => obj.attributes);

  const mailPromises = suppliers.map(async supplier => {
    const html = createEmailBody({
      supplier,
      vehicleType: vehicleType.attributes,
      shop: shop.attributes,
      partsOffersNeeded,
      href: [
        process.env.THIRD_PARTY_URL,
        'confirmEmail',
        supplier.id,
        quote.attributes.id,
      ].join('/'),
    });

    const subject = `Parts needed for a ${vehicleType.attributes.modelYear} ${vehicleType.attributes.make} ${vehicleType.attributes.model} ${vehicleType.attributes.engineVariant} ${vehicleType.attributes.bodyType}`;

    await mailer.send({ to: supplier.email, subject, html });
  });

  await Promise.all(mailPromises);

  const dbPromises = partsOffersNeeded.map(async ({ serviceType, name }) => {
    await new ThirdPartyOfferRequest({
      quoteId,
      serviceTypeId: serviceType.id,
      partName: name,
      supplierIds: suppliers.map(({ id }) => id),
    }).save();
  });

  await Promise.all(dbPromises);

  return res.json({});
};
