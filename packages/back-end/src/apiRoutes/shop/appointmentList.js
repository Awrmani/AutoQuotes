const Appointment = require('../../resources/Appointment');

module.exports = async (req, res) => {
  const { from, to } = req.query ?? {};

  const promises = (
    await Appointment.AppointmentModel.find(
      { startsAt: { $gte: from, $lt: to } },
      ['_id']
    ).exec()
  ).map(({ id }) => new Appointment().loadById(id.toString()));

  const objects = (await Promise.all(promises)).map(obj => obj.attributes);

  return res.json(objects);
};
