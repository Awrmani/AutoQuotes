import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { getToken } from '@autoquotes/libraries/src/reducers/tokenReducer';
import { confirmUser } from '../actions';
import paths from '../paths';

import Confirmation from '../components/Confirmation';

const UserConfirmationScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId, key, quoteId } = useParams();
  const token = useSelector(getToken);

  useEffect(() => {
    dispatch(confirmUser({ userId, key }));
  }, [userId, key, dispatch]);

  useEffect(() => {
    if (!token) return;

    toast.success('User confirmed');

    navigate(paths.quotingPage({ quoteId }));
  }, [token, quoteId, navigate]);
  return <Confirmation />;
};

export default UserConfirmationScreen;
