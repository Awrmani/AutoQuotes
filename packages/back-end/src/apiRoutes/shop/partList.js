const Part = require('../../resources/Part');

module.exports = async (req, res) => {
  const promises = (await Part.PartModel.find({}, ['_id']).exec()).map(
    ({ id }) => new Part().loadById(id.toString())
  );

  const objects = (await Promise.all(promises)).map(obj => obj.attributes);

  return res.json(objects);
};
