import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import UserQuotes from '../components/UserQuotes';
import { fetchQuoteList } from '../actions';

const UserQuotesScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchQuoteList());
  });
  return <UserQuotes />;
};

export default UserQuotesScreen;
