const Part = require('../../resources/Part');

module.exports = async (req, res) => {
  const { id } = req.params;

  const part = await new Part().loadById(id);

  // Update user's information and save
  const deletedID = await part.delete();

  res.json({ id: deletedID });
};
