const Shop = require('../../resources/Shop');

module.exports = async (req, res) => {
  // There can only be one document in this collection
  const shop = await new Shop().loadBy({});

  return res.json(shop.attributes);
};
