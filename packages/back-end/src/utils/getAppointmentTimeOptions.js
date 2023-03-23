const { groupBy } = require('lodash');
/**
 * This fn splits the day into 30 min slots, and offers available times
 * for a new appointment of length `appointmentLengthMins`.
 *
 * - Two appointments cannot overlap, in fact there must be at least 15 mins
 * between two appointments for the given stall for moving out the previous
 * vehicle, cleaning up the stall coffee etc.
 * - The system also has to obey numberOfStalls and openingHours
 */

const MIN_TIME_BETWEEN_APPOINTMENTS = 15;
const SLOT_TIME = 30;

const getAppointmentTimeOptionsForStall = ({
  openDate,
  closeDate,
  appointmentLengthMins,
  sortedAppointments,
  stall,
}) => {
  // Leave time for stall cleanup at the end of day
  const effectiveCloseDate = new Date(
    closeDate - MIN_TIME_BETWEEN_APPOINTMENTS * 60_000
  );

  const rawSlots = []; // each free time slot, independent of duration
  rawSlots.push({
    start: openDate,
    // If there are no appointments, create slot from open to close
    end: sortedAppointments[0]?.attributes.startsAt ?? effectiveCloseDate,
  });

  // We have created a slot from open to first appt. add slots between all others
  sortedAppointments.forEach((appointment, index) => {
    rawSlots.push({
      start: appointment.attributes.endsAt,
      // Slot ends at beginning of next appointment or end of day
      end:
        sortedAppointments[index + 1]?.attributes.startsAt ??
        effectiveCloseDate,
    });
  });

  // Now we have all available gaps between appointments in rawSlots.
  // Let's change their date objects so they fit onto the SLOT_TIMEs
  const slots = rawSlots.map((slot, index) => {
    let startAfterShopOpenMins = (slot.start - openDate) / 60_000; // time in minutes between shop open and start of appt.

    // add MIN_TIME_BETWEEN_APPOINTMENTS if not first appt. in day
    if (index !== 0) startAfterShopOpenMins += MIN_TIME_BETWEEN_APPOINTMENTS;

    // Snap it to next time slot start
    const timeIntoSlotStart = startAfterShopOpenMins % SLOT_TIME;
    if (timeIntoSlotStart)
      startAfterShopOpenMins += SLOT_TIME - timeIntoSlotStart;

    // Snap slot end to next time slot end
    const endAfterShopOpenMins = (slot.end - openDate) / 60_000;

    return {
      start: new Date(openDate.getTime() + startAfterShopOpenMins * 60_000),
      end: new Date(slot.end - (endAfterShopOpenMins % SLOT_TIME) * 60_000),
    };
  });

  const appointmentOptions = [];

  slots
    .filter(
      ({ start, end }) =>
        end.getTime() >= start.getTime() + appointmentLengthMins * 60_000
    )
    .forEach(({ start, end }) => {
      // Move from timeslot to timeslot, offer each one while our appointment still
      // fits into the sanitized time slot
      let offset = 0;
      while (
        end.getTime() >=
        start.getTime() + (appointmentLengthMins + offset) * 60_000
      ) {
        appointmentOptions.push({
          start: new Date(start.getTime() + offset * 60_000),
          end: new Date(
            start.getTime() + (appointmentLengthMins + offset) * 60_000
          ),
          stall,
        });

        offset += SLOT_TIME;
      }
    });

  return appointmentOptions;
};

const getAppointmentTimeOptions = ({
  existingAppointments,
  openDate, // Date obj with appropriate date/time
  closeDate, // Date obj with appropriate date/time
  numberOfStalls,
  appointmentLengthMins,
}) => {
  // Grop existing appointments by stall
  const grouped = groupBy(
    existingAppointments,
    appointment => appointment.attributes.stall
  );

  // Add missing groups (in case there was no appointment to that stall yet)
  new Array(numberOfStalls).fill().forEach((_, index) => {
    grouped[index + 1] ||= [];
  });

  // Go through all appointments (one stall at a time), sort them by start time ASC
  Object.keys(grouped).forEach(stall => {
    grouped[stall].sort(
      (a, b) =>
        new Date(a.attributes.startsAt) - new Date(b.attributes.startsAt)
    );
  });

  const options = Object.keys(grouped).reduce((acc, stall) => {
    const appointmentOptionsForStall = getAppointmentTimeOptionsForStall({
      openDate,
      closeDate,
      appointmentLengthMins,
      sortedAppointments: grouped[stall],
      stall: parseInt(stall, 10),
    });

    return [...acc, ...appointmentOptionsForStall];
  }, []);

  return options;
};

module.exports = getAppointmentTimeOptions;
