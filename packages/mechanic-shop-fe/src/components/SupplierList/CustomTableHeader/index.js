import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
import paths from '../../../paths';

const titles = [
  {
    id: 'Name',
    align: 'left',
    label: 'Name',
  },
  {
    id: 'Email',
    align: 'center',
    label: 'Email',
  },
  {
    id: 'Phone',
    align: 'center',
    label: 'Phone',
  },
];

const CustomTableHeader = () => {
  const navigate = useNavigate();

  return (
    <TableHead>
      <TableRow>
        {titles.map(title => (
          <TableCell key={title.id} align={title.align}>
            {title.label}
          </TableCell>
        ))}
        <TableCell align="right">
          <Button
            onClick={() => navigate(paths.addSupplier())}
            variant="text"
            startIcon={<Add />}
            data-testid="addSupplierButton"
          >
            Create
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
