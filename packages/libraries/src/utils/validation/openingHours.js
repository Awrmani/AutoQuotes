const { pull } = require('lodash');
const { DAYS } = require('../../constants/days');

const openingHours = oh => {
  if (typeof oh !== 'object') return 'must be an object';

  // Verify if the correct keys are only present
  const extraKeys = pull(Object.keys(oh), ...Object.values(DAYS));
  if (extraKeys.length)
    return `Only the following keys are allowed: [${Object.values(DAYS).join(
      ', '
    )}] but got [${extraKeys.join(', ')}]`;

  // Check each day
  for (const day of Object.keys(oh)) {
    const dayDescriptor = oh[day];
    const keyCount = Object.keys(dayDescriptor).length;

    if (keyCount === 0) {
      // The day object is empty, check the next
      // eslint-disable-next-line no-continue
      continue;
    }

    if (
      keyCount !== 4 ||
      typeof dayDescriptor.openHour !== 'number' ||
      typeof dayDescriptor.openMinute !== 'number' ||
      typeof dayDescriptor.closeHour !== 'number' ||
      typeof dayDescriptor.closeMinute !== 'number'
    ) {
      return `exactly the "openHour", "openMinute", "closeHour", "closeMinute" attributes need to be present in each provided day. Error found in ${day}.`;
    }

    if (
      // Make sure hours are between 0 and 24, minutes are between 0 and 59
      dayDescriptor.openHour < 0 ||
      dayDescriptor.openHour > 24 ||
      dayDescriptor.openMinute < 0 ||
      dayDescriptor.openMinute > 59 ||
      dayDescriptor.closeHour < 0 ||
      dayDescriptor.closeHour > 24 ||
      dayDescriptor.closeMinute < 0 ||
      dayDescriptor.closeMinute > 59 ||
      // Make sure if hr is 24, then there is no minutes
      (dayDescriptor.openHour === 24 && dayDescriptor.openMinute) ||
      (dayDescriptor.closeHour === 24 && dayDescriptor.closeMinute) ||
      // Make sure open is ahead of close
      dayDescriptor.closeHour * 100 + dayDescriptor.closeMinute <=
        dayDescriptor.open * 100 + dayDescriptor.openMinute
    ) {
      return `Incorrect time given in ${day}.`;
    }
  }

  return undefined;
};

module.exports = { openingHours };
