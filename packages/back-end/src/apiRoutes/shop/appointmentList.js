const Appointment = require('../../resources/Appointment');
const EndUser = require('../../resources/EndUser');

module.exports = async (req, res) => {
  const { from, to } = req.query ?? {};

  const promises = (
    await Appointment.AppointmentModel.find(
      { startsAt: { $gte: from, $lt: to } },
      ['_id']
    ).exec()
  ).map(({ id }) => new Appointment().loadById(id.toString()));

  const appointments = (await Promise.all(promises)).map(obj => obj.attributes);

  const appwithCustomerPromises = appointments.map(
    async ({ customerId, ...rest }) => ({
      ...rest,
      customer: (await new EndUser().loadById(customerId)).attributes,
    })
  );

  const appwithCustomer = await Promise.all(appwithCustomerPromises);

  return res.json(appwithCustomer);
};
