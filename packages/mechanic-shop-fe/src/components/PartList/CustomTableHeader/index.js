import { Add } from '@mui/icons-material';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';

const titles = [
  {
    id: 'Item',
    numeric: false,
    label: 'Item',
  },
  {
    id: 'Price',
    numeric: true,
    label: 'Price',
  },
  {
    id: 'Quantity',
    numeric: true,
    disablePadding: false,
    label: 'Quantity',
  },
];

const CustomTableHeader = () => {
  return (
    <TableHead>
      <TableRow>
        {titles.map(title => (
          <TableCell key={title.id} align={title.numeric ? 'right' : 'left'}>
            {title.label}
          </TableCell>
        ))}
        <TableCell align="right">
          <Button
            LinkComponent="a"
            href="/itemForm"
            variant="text"
            startIcon={<Add />}
          >
            Create
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
