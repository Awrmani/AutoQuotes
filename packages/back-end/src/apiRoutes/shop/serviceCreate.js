const Service = require('../../resources/ServiceType');

module.exports = async (req, res) => {
  // Excluding ID from object
  const { id, ...partData } = req.body ?? {};

  // Resources handle their own format validation and throw special
  // errors, that are in turn handled by a specific Express middleware
  await new Service(partData).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
