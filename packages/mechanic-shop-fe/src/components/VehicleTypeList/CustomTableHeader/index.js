import { useNavigate } from 'react-router-dom';
import { Add } from '@mui/icons-material';
import { Button, TableCell, TableHead, TableRow } from '@mui/material';
import paths from '../../../paths';

const titles = [
  {
    id: 'Make',
    align: 'left',
    label: 'Make',
  },
  {
    id: 'Model',
    align: 'left',
    label: 'Model',
  },
  {
    id: 'ModelYear',
    align: 'center',
    disablePadding: false,
    label: 'Model Year',
  },
  {
    id: 'EgineVariant',
    align: 'center',
    disablePadding: false,
    label: 'Engine Variant',
  },
  {
    id: 'BodyType',
    align: 'center',
    disablePadding: false,
    label: 'Body Type',
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
            onClick={() => navigate(paths.addVehicleType())}
            variant="text"
            startIcon={<Add />}
            data-testid="addVehicleTypeButton"
          >
            Create
          </Button>
        </TableCell>
      </TableRow>
    </TableHead>
  );
};

export default CustomTableHeader;
