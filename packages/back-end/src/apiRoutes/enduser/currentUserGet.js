module.exports = async (req, res) => {
  return res.json(req.user);
};
