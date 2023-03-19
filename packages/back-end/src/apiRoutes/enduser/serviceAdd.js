const loadQuote = require('../../utils/loadQuote');
const listServiceTypesForVehicleTypeId = require('../../utils/listServiceTypesForVehicleTypeId');

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId, serviceTypeId } = req.params;

  const quote = await loadQuote({ customerId, quoteId });
  const compatibleServices = await listServiceTypesForVehicleTypeId(
    quote.attributes.vehicleTypeId
  );

  // Validate serviceTypeId being compatible with the vehicle
  if (
    !compatibleServices.find(
      ({ attributes }) => attributes.id === serviceTypeId
    )
  )
    throw new Error(
      'The provided serviceTypeId does not exist or is not compatible with the vehicle'
    );

  // Verify that we do not yet have such a service type added to the quote
  if (
    quote.attributes.lineItems.find(
      ({ serviceTypeId: toCheck }) => toCheck === serviceTypeId
    )
  )
    throw new Error('Only one of each service type can be added');

  const lineItems = [
    ...quote.attributes.lineItems,
    { serviceTypeId, selectedParts: [] },
  ];

  quote.update({ lineItems });
  await quote.save();

  return res.json({});
};
