import PropTypes from 'prop-types';
import { Delete } from '@mui/icons-material';
import { IconButton, Toolbar, Tooltip, Typography } from '@mui/material';

const CustomTableToolbar = props => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} item(s) selected
        </Typography>
      ) : (
        <Typography sx={{ flex: '1 1 100%' }} variant="h6" component="div">
          Inventory
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <Delete />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

CustomTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};

export default CustomTableToolbar;
