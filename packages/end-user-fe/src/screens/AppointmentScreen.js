import { useNavigate, useParams } from 'react-router-dom';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import moment from 'moment';
import { createAppointment, fetchAppointmentOptions } from '../actions';
import Appointment from '../components/Appointment';
import {
  getAppointmentOptionsQuery,
  getQuoteDetailsQuery,
} from '../reducers/queriesReducer';
import paths from '../paths';

const AppointmentScreen = () => {
  const navigate = useNavigate();
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
  const handleSuccess = useCallback(() => {
    navigate(paths.userQuotes());
  }, [navigate]);
  // Extract the list query from the redux store
  const appointmentOptionsQuery = useSelector(getAppointmentOptionsQuery);
  const quoteDetailsQuery = useSelector(getQuoteDetailsQuery);
  const { isFetching, result: quoteResult } = quoteDetailsQuery;
  const { result } = appointmentOptionsQuery ?? {};

  // DO not render while data is fetching from the BE
  if (!result || isFetching || !quoteResult)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );
  return (
    <Form
      enableReinitialize
      initialValues={initialValues}
      action={createAppointment}
      onSuccess={handleSuccess}
    >
      <Appointment date={date} setDate={setDate} />
    </Form>
  );
};
export default AppointmentScreen;
