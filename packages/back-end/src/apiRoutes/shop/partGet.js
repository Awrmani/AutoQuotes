const Part = require('../../resources/Part');

module.exports = async (req, res) => {
  const { id } = req.params;

  const part = await new Part().loadById(id);

  res.json(part.attributes);
};
