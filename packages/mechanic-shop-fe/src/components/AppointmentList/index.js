import React, { useMemo, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { useSelector } from 'react-redux';
import {
  getAppointmentList,
  getShopSettings,
} from '../../reducers/queriesReducer';
import paths from '../../paths';

const localizer = momentLocalizer(moment);

class Stall {
  constructor(stallId) {
    this.stallId = stallId;
    this.stallTitle = `Stall ${stallId}`;
  }
}

const AppointmentList = ({ setSelectedDay, selectedDay }) => {
  const navigate = useNavigate();

  const appointments = useSelector(getAppointmentList);
  const shopSettings = useSelector(getShopSettings);

  const stalls = useMemo(() => {
    const { numberOfStalls } = shopSettings;
    const results = [];
    for (let i = 1; i <= numberOfStalls; i++) {
      results.push(new Stall(i));
    }
    return results;
  }, [shopSettings]);

  const schedules = useMemo(
    () =>
      appointments.map(a => {
        const startDate = moment(a.startsAt);
        return {
          id: a.id,
          title: a.customerId,
          start: startDate.toDate(),
          end: startDate.add(a.duration, 'minutes').toDate(),
          resourceId: a.stall,
        };
      }),
    [appointments]
  );

  const onNavigate = useCallback(
    curDate => {
      const date = moment(curDate);
      setSelectedDay(new Date(date.year(), date.month(), date.date()));
    },
    [setSelectedDay]
  );

  return (
    <div className="height600">
      <Calendar
        date={selectedDay}
        defaultView={Views.DAY}
        events={schedules}
        localizer={localizer}
        resourceIdAccessor="stallId"
        resources={stalls}
        resourceTitleAccessor="stallTitle"
        step={30}
        views={['day']}
        onSelectEvent={e => navigate(paths.appointmentDetails({ id: e.id }))}
        onNavigate={onNavigate}
      />
    </div>
  );
};

AppointmentList.propTypes = {
  selectedDay: PropTypes.instanceOf(Date),
  setSelectedDay: PropTypes.func,
};

export default AppointmentList;
