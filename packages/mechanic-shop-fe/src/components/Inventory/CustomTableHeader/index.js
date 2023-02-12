import PropTypes from 'prop-types';
import { Checkbox, TableCell, TableHead, TableRow } from '@mui/material';

const titles = [
  {
    id: 'Item',
    numeric: false,
    disablePadding: true,
    label: 'Item',
  },
  {
    id: 'Price',
    numeric: true,
    disablePadding: false,
    label: 'Price',
  },
  {
    id: 'Quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
];

const CustomTableHeader = props => {
  const { onSelectAllClick, numSelected, rowCount } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
          />
        </TableCell>
        {titles.map(title => (
          <TableCell
            key={title.id}
            align={title.numeric ? 'right' : 'left'}
            padding={title.disablePadding ? 'none' : 'normal'}
          >
            {title.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

CustomTableHeader.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  rowCount: PropTypes.number.isRequired,
};

export default CustomTableHeader;
