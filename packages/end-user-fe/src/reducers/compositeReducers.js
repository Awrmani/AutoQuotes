import { createSelector } from 'reselect';
import { getShopSettings } from './queriesReducer';

const DAY_NAMES = {
  monday: 'Mon',
  tuesday: 'Tue',
  wednesday: 'Wed',
  thursday: 'Thu',
  friday: 'Fri',
  saturday: 'Sat',
  sunday: 'Sun',
};

export const getHumanReadableOpeningHours = createSelector(
  getShopSettings,
  ({ openingHours } = {}) => {
    if (!openingHours) return [];

    /**
     * Group days like: [
     *    { openHour: 8, openMinute: 0, closeHour: 17, closeMinute: 0, days: ['monday', 'tuesday'] },
     *    { openHour: 9, openMinute: 0, closeHour: 17, closeMinute: 0, days: ['wednesday'] },
     *    { openHour: 8, openMinute: 0, closeHour: 17, closeMinute: 0, days: ['monday', 'tuesday'] },
     * ]
     */
    const grouped = Object.keys(DAY_NAMES).reduce((acc, dayName) => {
      // Loop through all the days in the `openingHours`
      const { openHour, openMinute, closeHour, closeMinute } =
        openingHours[dayName] ?? {};

      // Check if we are indeed open on that day
      if (
        typeof openHour !== 'number' ||
        typeof openMinute !== 'number' ||
        typeof closeHour !== 'number' ||
        typeof closeMinute !== 'number'
      )
        return acc;

      // Try to find a matching config already in acc
      const lastDescriptor = acc[acc.length - 1];
      const matchingWithLast =
        acc.length &&
        openHour === lastDescriptor.openHour &&
        openMinute === lastDescriptor.openMinute &&
        closeHour === lastDescriptor.closeHour &&
        closeMinute === lastDescriptor.closeMinute;

      // Found, add day to that object (foundInAcc is by reference)
      if (matchingWithLast) {
        lastDescriptor.days.push(dayName);
        return acc;
      }

      // Add new object
      return [
        ...acc,
        {
          openHour,
          openMinute,
          closeHour,
          closeMinute,
          days: [dayName],
        },
      ];
    }, []);

    /**
     * Add guman readable data to groups: [
     *    { ..., daysHuman: 'Mon - Tue', timeRangeHuman: '08:00 - 17:00' },
     *    { ..., daysHuman: 'Wed',       timeRangeHuman: '09:00 - 17:00' },
     *    { ..., daysHuman: 'Thu - Fri', timeRangeHuman: '08:00 - 17:00' },
     * ]
     */
    const result = grouped.map(group => {
      const daysHuman =
        group.days.length === 1
          ? DAY_NAMES[group.days[0]]
          : `${DAY_NAMES[group.days[0]]} - ${
              DAY_NAMES[group.days[group.days.length - 1]]
            }`;

      const timeRangeHuman = `${String(group.openHour).padStart(2, 0)}:${String(
        group.openMinute
      ).padStart(2, 0)} - ${String(group.closeHour).padStart(2, 0)}:${String(
        group.closeMinute
      ).padStart(2, 0)}`;

      return { ...group, daysHuman, timeRangeHuman };
    });

    return result;
  }
);
