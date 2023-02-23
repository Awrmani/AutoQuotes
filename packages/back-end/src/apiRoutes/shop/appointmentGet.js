const Appointment = require('../../resources/Appointment');

module.exports = async (req, res) => {
  const { id } = req.params;

  const appointment = await new Appointment().loadById(id);

  res.json(appointment.attributes);
};
