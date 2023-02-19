import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
import paths from '../../../paths';

const titles = [
  {
    id: 'Name',
    numeric: false,
    label: 'Name',
  },
  {
    id: 'Email',
    numeric: false,
    label: 'Email',
  },
  {
    id: 'Phone',
    numeric: false,
    disablePadding: false,
    label: 'Phone',
  },
  {
    id: 'Role',
    numeric: false,
    disablePadding: false,
    label: 'Role',
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
            onClick={() => navigate(paths.addUser())}
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
