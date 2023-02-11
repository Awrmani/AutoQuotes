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

import CustomTableHeader from './CustomTableHeader';
import CustomTableToolbar from './CustomTableToolbar';

// import { visuallyHidden } from '@mui/utils';

const rows = [
  {
    id: '012345678901',
    name: 'Oil filter (Honda/Nissan) 7356',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 1334 (Hyundai/old Honda)',
    price: 6,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 7060 (GM/Dodge)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 1042 (old GM)',
    price: 9,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 7502 (Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 7502 (Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 1372 (old Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 1085 (old Dodge/Jeep)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: ['Dodge', 'Jeep'],
  },
  {
    name: 'Oil filter 7899 (Dodge HEMI)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 1085 (7145 for Toyota)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 7502 (Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
  {
    name: 'Oil filter 1372 (old Ford)',
    price: 5,
    amountInStock: 22,
    compatibleVehicles: [],
  },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

const Inventory = () => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('name');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = event => {
    if (event.target.checked) {
      const newSelected = rows.map(n => n.name);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

  const isSelected = name => selected.indexOf(name) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <CustomTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <CustomTableHeader
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {rows
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .sort(getComparator(order, orderBy))
                .map((row, index) => {
                  const isItemSelected = isSelected(row.name);

                  return (
                    <TableRow
                      hover
                      onClick={event => handleClick(event, row.name)}
                      role="checkbox"
                      tabIndex={-1}
                      key={row.name}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox color="primary" checked={isItemSelected} />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={row.id}
                        scope="row"
                        padding="none"
                      >
                        {row.name}
                      </TableCell>
                      <TableCell align="right" style={{ width: 160 }}>
                        {row.price}
                      </TableCell>
                      <TableCell align="right" style={{ width: 160 }}>
                        {row.amountInStock}
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
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 15]}
          component="div"
          count={rows.length}
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
