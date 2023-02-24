import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CircularProgress, Stack } from '@mui/material';
import UserList from '../components/UserList';
import { fetchUserList } from '../actions';
import { getUserListQuery } from '../reducers/queriesReducer';

const UserListScreen = () => {
  const dispatch = useDispatch();

  // Hook responsible for loading part list from the BE
  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  // Extract the list query from the redux store
  const userListQuery = useSelector(getUserListQuery);
  const { isFetching, result } = userListQuery ?? {};

  // DO not render while data is fetching from the BE
  if (isFetching || !result)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return <UserList />;
};

export default UserListScreen;
