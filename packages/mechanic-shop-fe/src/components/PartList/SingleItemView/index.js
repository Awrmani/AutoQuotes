import React from 'react';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  Box,
  TableRow,
} from '@mui/material';
import { Cancel, Edit, Save } from '@mui/icons-material';

const item = {
  id: '012345678901',
  name: 'Oil filter (Honda/Nissan) 7356',
  price: 5,
  amountInStock: 22,
  compatibleVehicles: [],
};
const ItemView = () => {
  const [editable, setEditable] = React.useState(false);
  const makeEditable = () => {
    setEditable(!editable);
  };

  return (
    <>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              <b>Name</b>
            </TableCell>
            <TableCell contentEditable={editable}>{item.name}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Price</b>
            </TableCell>
            <TableCell contentEditable={editable}>{item.price}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Quantity</b>
            </TableCell>
            <TableCell contentEditable={editable}>
              {item.amountInStock}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <b>Compatibility</b>
            </TableCell>
            <TableCell contentEditable={editable}>
              {item.compatibleVehicles.toString()}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box sx={{ float: 'right', align: 'right' }}>
        {editable ? (
          <Button
            sx={{
              minWidth: '120px',
              m: 2,
            }}
            variant="contained"
            startIcon={<Cancel />}
            onClick={makeEditable}
          >
            Cancel
          </Button>
        ) : (
          <Button
            sx={{ m: 2, minWidth: '120px' }}
            variant="contained"
            startIcon={<Edit />}
            onClick={makeEditable}
          >
            Edit
          </Button>
        )}
        <Button
          sx={{ m: 2, minWidth: '120px' }}
          variant="contained"
          startIcon={<Save />}
        >
          Save
        </Button>
      </Box>
    </>
  );
};

export default ItemView;
