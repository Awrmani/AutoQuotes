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
import { useSelector } from 'react-redux';
import { getQuoteList } from '../../reducers/queriesReducer';
import paths from '../../paths';

const UserQuotes = () => {
  const navigate = useNavigate();

  const quoteList = useSelector(getQuoteList);

  const onClick = useCallback(
    ({ id }) => {
      navigate(paths.quotingPage({ quoteId: id }));
    },
    [navigate]
  );

  return (
    <Container
      sx={{
        width: '50%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        mt: 3,
        padding: 2,
      }}
      component={Paper}
    >
      <Typography gutterBottom variant={'h5'} sx={{ textAlign: 'center' }}>
        Your quotes
      </Typography>

      <List sx={{ width: '100%', maxWidth: 380 }}>
        {quoteList?.map(quote => (
          <ListItemButton
            divider
            key={quote.id}
            onClick={() => onClick({ id: quote.id })}
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
