import * as React from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';

import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';

import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';

import CustomTableToolbar from './CustomTableToolbar';
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

const Inventory = () => {
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = items.map(item => item.id);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = id => selected.indexOf(id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - items.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CustomTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <CustomTableHeader
              numSelected={selected.length}
              onSelectAllClick={handleSelectAllClick}
              rowCount={items.length}
            />
            <TableBody>
              {items
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map(item => {
                  const isItemSelected = isSelected(item.id);

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, item.id)}
                      key={item.id}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} />
                      </TableCell>
                      <TableCell component="th" scope="row" padding="none">
                        {item.name}
                      </TableCell>
                      <TableCell align="right" style={{ width: 160 }}>
                        {item.price}
                      </TableCell>
                      <TableCell align="right" style={{ width: 160 }}>
                        {item.amountInStock}
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

export default Inventory;
