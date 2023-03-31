import React, { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getQuoteList } from '../../reducers/queriesReducer';
import paths from '../../paths';
import { fetchQuoteDetails, fetchServiceTypeList } from '../../actions';

const UserQuotes = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const quoteList = useSelector(getQuoteList);

  const onClick = useCallback(
    ({ id, isFinalized }) => {
      dispatch(fetchQuoteDetails({ quoteId: id }));
      if (!isFinalized) {
        dispatch(fetchServiceTypeList({ quoteId: id }));
        navigate(paths.quotingPage());
      } else {
        navigate(paths.userQuoteDetails({ id }));
      }
    },
    [dispatch, navigate]
  );

  return (
    <Container sx={{ mt: 3, padding: 2 }} component={Paper}>
      <Typography variant={'h5'}> Your quotes</Typography>

      <List sx={{ width: '100%', maxWidth: 380 }}>
        {quoteList?.map(quote => (
          <ListItemButton
            key={quote.id}
            onClick={() =>
              onClick({ id: quote.id, isFinalized: quote.isFinalized })
            }
          >
            <ListItemText
              primary={`Quote Number: ${quote.id}`}
              secondary={`Date: ${new Date(quote.createdAt).toLocaleString()}`}
            />
          </ListItemButton>
        ))}
      </List>
    </Container>
  );
};

export default UserQuotes;
