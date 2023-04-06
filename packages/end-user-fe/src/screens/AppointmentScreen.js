import { useParams } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import moment from 'moment';
import { createAppointment, fetchAppointmentOptions } from '../actions';
import Appointment from '../components/Appointment';
import { getAppointmentOptionsQuery } from '../reducers/queriesReducer';

const AppointmentScreen = () => {
  const dispatch = useDispatch();
  const [date, setDate] = useState(moment());
  const { quoteId } = useParams();
  const initialValues = useMemo(
    () => ({
      quoteId,
    }),
    [quoteId]
  );
  useEffect(() => {
    dispatch(
      fetchAppointmentOptions({
        quoteId,
        date: moment(date).toISOString(),
      })
    );
  }, [date, dispatch, quoteId]);

  // Extract the list query from the redux store
  const appointmentOptionsQuery = useSelector(getAppointmentOptionsQuery);
  const { result } = appointmentOptionsQuery ?? {};

  // DO not render while data is fetching from the BE
  if (!result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );
  return (
    <Form
      initialValues={initialValues}
      action={createAppointment}
      onSuccess={null}
    >
      <Appointment date={date} setDate={setDate} />
    </Form>
  );
};
export default AppointmentScreen;
