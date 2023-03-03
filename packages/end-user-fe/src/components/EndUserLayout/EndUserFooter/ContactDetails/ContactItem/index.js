import { IconButton, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const buttonSx = {
  m: 0,
  '&:hover': {
    textDecoration: 'underline',
    color: 'primary.main',
  },
};

const ContactItem = ({ title, icon, href }) => {
  return (
    <IconButton
      color="inherit"
      edge="start"
      disableRipple
      sx={{ justifyContent: 'left', m: 0, p: 0 }}
    >
      {icon}
      <Typography
        noWrap
        color="inherit"
        component="a"
        href={href}
        target="_blank"
        underline="none"
        sx={buttonSx}
        fontSize="small"
      >
        {title}
      </Typography>
    </IconButton>
  );
};

ContactItem.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.element,
};

export default ContactItem;
