import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
import paths from '../../../paths';

const titles = [
  {
    id: 'Item',
    numeric: false,
    label: 'Item',
  },

  {
    id: 'Description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'Minutes',
    numeric: true,
    label: 'Hour',
  },
];

const CustomTableHeader = () => {
  const navigate = useNavigate();

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
            onClick={() => navigate(paths.addService())}
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
