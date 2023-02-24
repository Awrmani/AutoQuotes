const Appointment = require('../../resources/Appointment');

module.exports = async (req, res) => {
  const { id } = req.params;

  const appointment = await new Appointment().loadById(id);

  /**
   * TODO send email to customer
   */

  /**
   * Note, scope has been cut, we would refund the deposit here
   */

  const deletedID = await appointment.delete();

  res.json({ id: deletedID });
};
