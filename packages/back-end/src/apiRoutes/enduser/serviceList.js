const { pick } = require('lodash');
const loadQuote = require('../../utils/loadQuote');
const listServiceTypesForVehicleTypeId = require('../../utils/listServiceTypesForVehicleTypeId');

module.exports = async (req, res) => {
  const customerId = req.user?.id; // user may or may not be logged in
  const { quoteId } = req.params;

  const quote = await loadQuote({ customerId, quoteId });

  const compatibleServices = await listServiceTypesForVehicleTypeId(
    quote.attributes.vehicleTypeId
  );

  // Return name and description with all services compatible with that vehicle
  return res.json(
    compatibleServices.map(obj =>
      pick(obj.attributes, ['id', 'name', 'description'])
    )
  );
};
