import { createSelector } from 'reselect';
import { set } from 'lodash';
import { getShopSettings, getVehicleTypeList } from './queriesReducer';

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
     *    { isOpen: true, openHour: 8, openMinute: 0, closeHour: 17, closeMinute: 0, days: ['monday', 'tuesday'] },
     *    { isOpen: true, openHour: 9, openMinute: 0, closeHour: 17, closeMinute: 0, days: ['wednesday'] },
     *    { isOpen: true, openHour: 8, openMinute: 0, closeHour: 17, closeMinute: 0, days: ['thursday', 'friday'] },
     *    { isOpen: false, days: ['saturday', 'sunday']}
     * ]
     */
    const grouped = Object.keys(DAY_NAMES).reduce((acc, dayName) => {
      // Loop through all the days in the `openingHours`
      const { openHour, openMinute, closeHour, closeMinute } =
        openingHours[dayName] ?? {};

      // Check if we are indeed open on that day
      const isOpen =
        typeof openHour === 'number' &&
        typeof openMinute === 'number' &&
        typeof closeHour === 'number' &&
        typeof closeMinute === 'number';

      // Try to find a matching config already in acc
      const lastDescriptor = acc[acc.length - 1];

      // This is an IIFE (Immediately invoked function expression)
      const matchingWithLast = (() => {
        if (!lastDescriptor) return false;
        if (!lastDescriptor.isOpen && !isOpen) return true;
        if (
          lastDescriptor &&
          openHour === lastDescriptor.openHour &&
          openMinute === lastDescriptor.openMinute &&
          closeHour === lastDescriptor.closeHour &&
          closeMinute === lastDescriptor.closeMinute
        )
          return true;

        return false;
      })();

      // Found, add day to that object (foundInAcc is by reference)
      if (matchingWithLast) {
        lastDescriptor.days.push(dayName);
        return acc;
      }

      // Add new object
      return [
        ...acc,
        {
          isOpen,
          ...(isOpen && {
            openHour,
            openMinute,
            closeHour,
            closeMinute,
          }),
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

      let timeRangeHuman;
      if (group.isOpen) {
        timeRangeHuman = `${String(group.openHour).padStart(2, 0)}:${String(
          group.openMinute
        ).padStart(2, 0)} - ${String(group.closeHour).padStart(2, 0)}:${String(
          group.closeMinute
        ).padStart(2, 0)}`;
      } else {
        timeRangeHuman = 'Closed';
      }

      return { ...group, daysHuman, timeRangeHuman };
    });

    return result;
  }
);

export const getVehicleTypeOptions = createSelector(
  getVehicleTypeList,
  vehicleTypeList => {
    const options = {};

    (vehicleTypeList ?? []).forEach(
      ({ make, model, modelYear, engineVariant, bodyType }) => {
        set(
          options,
          [make, model, `_${modelYear}`, engineVariant, bodyType],
          true
        );
      }
    );

    return options;
  }
);
