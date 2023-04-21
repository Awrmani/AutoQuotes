const Appointment = require('../../resources/Appointment');
const EndUser = require('../../resources/EndUser');
const Quote = require('../../resources/Quote');
const VehicleType = require('../../resources/VehicleType');
const ServiceType = require('../../resources/ServiceType');

module.exports = async (req, res) => {
  const { id } = req.params;

  const appointment = await new Appointment().loadById(id);

  // Expand customer and quote also
  const { quoteId, customerId } = appointment.attributes;
  const customer = await new EndUser().loadBy(customerId);
  const quote = await new Quote().loadBy(quoteId);

  let vehicleType;
  try {
    vehicleType = await new VehicleType().loadById(
      quote.attributes.vehicleTypeId
    );
  } catch (e) {
    // noop
  }

  const lineItemPromises = quote.attributes.lineItems.map(
    async ({ serviceTypeId, ...rest }) => ({
      serviceTypeId,
      ...rest,
      serviceType: (await new ServiceType().loadById(serviceTypeId)).attributes,
    })
  );
  const lineItems = await Promise.all(lineItemPromises);

  res.json({
    appointment: appointment.attributes,
    customer: customer.attributes,
    quote: quote.attributes,
    vehicleType: vehicleType?.attributes,
    lineItems,
  });
};
