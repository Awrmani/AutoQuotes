const Part = require('../../resources/Part');

module.exports = async (req, res) => {
  const { id } = req.params;

  const part = await new Part().loadById(id);

  // Resource handles it's own validation
  part.update(req.body).save();

  // It's considered to be a good practice to return
  // "" or {} even if we have nothing to say
  return res.json({});
};
