import { IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const buttonSx = {
  m: 0,
  textDecoration: `none`,
  '&:hover': {
    textDecoration: 'underline',
    color: 'primary.main',
  },
};
const ItemButton = ({ title, icon, onclick }) => {
  return (
    <IconButton
      onClick={onclick}
      color="inherit"
      edge="start"
      disableRipple
      sx={{ justifyContent: 'left', m: 0, p: 0 }}
    >
      {icon}
      <Typography noWrap color="inherit" sx={buttonSx} fontSize="small">
        {title}
      </Typography>
    </IconButton>
  );
};

ItemButton.propTypes = {
  title: PropTypes.string,
  icon: PropTypes.element,
  onclick: PropTypes.func,
};

export default ItemButton;
