import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
import paths from '../../../paths';

const titles = [
  {
    id: 'service',
    numeric: false,
    label: 'Service',
  },

  {
    id: 'description',
    numeric: false,
    disablePadding: false,
    label: 'Description',
  },
  {
    id: 'timeInMinutes',
    numeric: true,
    label: 'Duration(minutes)',
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
            data-testid="addServiceButton"
          >
            Create
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
