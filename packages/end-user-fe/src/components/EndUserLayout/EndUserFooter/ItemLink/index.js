import { IconButton, Link } from '@mui/material';
import PropTypes from 'prop-types';

export const linkSx = {
  '&:hover': {
    textDecoration: 'underline',
    color: 'primary.main',
  },
};

const ItemLink = ({ title, icon, href }) => {
  return (
    <IconButton
      color="inherit"
      edge="start"
      disableRipple
      sx={{ justifyContent: 'left', m: 0, p: 0 }}
    >
      {icon}
      <Link
        noWrap
        underline="none"
        target="_blank"
        rel="noopener"
        color="inherit"
        href={href}
        sx={linkSx}
        fontSize="small"
      >
        {title}
      </Link>
    </IconButton>
  );
};

ItemLink.propTypes = {
  title: PropTypes.string,
  href: PropTypes.string,
  icon: PropTypes.element,
};

export default ItemLink;
