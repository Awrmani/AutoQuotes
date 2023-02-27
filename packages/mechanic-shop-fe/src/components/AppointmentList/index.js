import React, { Fragment, useEffect, useMemo, useState } from 'react';
// import PropTypes from 'prop-types';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Calendar, Views, momentLocalizer } from 'react-big-calendar';

import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAppointmentList } from '../../reducers/queriesReducer';
import paths from '../../paths';
import { fetchAppointmentList } from '../../actions';

const localizer = momentLocalizer(moment);

const resourceMap = [
  { resourceId: 1, resourceTitle: 'Stall 1' },
  { resourceId: 2, resourceTitle: 'Stall 2' },
  { resourceId: 3, resourceTitle: 'Stall 3' },
  { resourceId: 4, resourceTitle: 'Stall 4' },
];

const AppointmentList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [currentDate, setCurrentDate] = useState(() => {
    const myDate = new Date();
    return new Date(myDate.getFullYear(), myDate.getMonth(), myDate.getDate());
  });

  const [nextDay, setNextDate] = useState(() => {
    const myDate = new Date();
    return new Date(
      myDate.getFullYear(),
      myDate.getMonth(),
      myDate.getDate() + 1
    );
  });

  const appointmentList = useSelector(getAppointmentList);

  const events = appointmentList.map(a => {
    const startDate = moment(a.startsAt);
    return {
      id: a.customerId,
      title: a.customerId,
      start: startDate.toDate(),
      end: startDate.add(a.duration, 'minutes').toDate(),
      resourceId: a.stall,
    };
  });

  const onNavigate = curDate => {
    setCurrentDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate())
    );
    setNextDate(
      new Date(curDate.getFullYear(), curDate.getMonth(), curDate.getDate() + 1)
    );
  };

  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date(),
      views: ['day', 'work_week'],
    }),
    []
  );

  return (
    <Fragment>
      <div className="height600">
        <Calendar
          defaultDate={defaultDate}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          step={60}
          views={views}
          onSelectEvent={e => navigate(paths.AppointmentDetails({ id: e.id }))}
          onNavigate={curDate => {
            onNavigate(curDate);
          }}
        />
      </div>
    </Fragment>
  );
};

// Resource.propTypes = {
//  localizer: PropTypes.instanceOf(DateLocalizer),
// };

export default AppointmentList;
