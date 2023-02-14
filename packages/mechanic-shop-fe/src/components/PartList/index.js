import * as React from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  TablePagination,
  Paper,
  IconButton,
  Tooltip,
} from '@mui/material';

import { Delete, Edit } from '@mui/icons-material';
import CustomTableHeader from './CustomTableHeader';

const items = [
  {
    id: '012345678901',
    name: 'Oil filter (Honda/Nissan) 7356',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678902',
    name: 'Oil filter 1334 (Hyundai/old Honda)',
    price: 6,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678903',
    name: 'Oil filter 7060 (GM/Dodge)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678904',
    name: 'Oil filter 1042 (old GM)',
    price: 9,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678905',
    name: 'Oil filter 7502 (Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678906',
    name: 'Oil filter 7502 (Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678907',
    name: 'Oil filter 1372 (old Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678908',
    name: 'Oil filter 1085 (old Dodge/Jeep)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: ['Dodge', 'Jeep'],
  },
  {
    id: '012345678909',
    name: 'Oil filter 7899 (Dodge HEMI)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678910',
    name: 'Oil filter 1085 (7145 for Toyota)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678911',
    name: 'Oil filter 7502 (Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    id: '012345678912',
    name: 'Oil filter 1372 (old Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
];

const PartList = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <CustomTableHeader rowCount={items.length} />
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => {
                  return (
                    <TableRow hover key={item.id}>
                      <TableCell component="th" scope="row" padding="small">
                        {item.name}
                      </TableCell>
                      <TableCell align="right" style={{ width: 160 }}>
                        {item.price}
                      </TableCell>
                      <TableCell align="right" style={{ width: 160 }}>
                        {item.amountInStock}
                      </TableCell>
                      <TableCell align="right" style={{ width: 160 }}>
                        <Tooltip title="Delete">
                          <IconButton>
                            <Delete />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Edit">
                          <IconButton>
                            <Edit />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 53 * emptyRows,
                  }}
                >
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={items.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PartList;
