import React, { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
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
import { getVehicleTypeList } from '../../reducers/queriesReducer';
import CustomTableHeader from './CustomTableHeader';
import { deleteVehicleType } from '../../actions';
import paths from '../../paths';

const VehicleTypeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const vehicletypeList = useSelector(getVehicleTypeList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const items = useMemo(() => {
    const from = page * rowsPerPage;
    const to = from + rowsPerPage;

    return vehicletypeList.slice(from, to);
  }, [vehicletypeList, page, rowsPerPage]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, rowsPerPage - items.length);

  const handleDeleteClick = useCallback(
    id => {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete?')) {
        dispatch(deleteVehicleType({ id }));
      }
    },
    [dispatch]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <CustomTableHeader rowCount={items.length} />
            <TableBody>
              {items.map(item => (
                <TableRow
                  hover
                  key={item.id}
                  data-testid={`vehicletype-${item.id}`}
                >
                  <TableCell component="th" scope="row">
                    {item.make}
                  </TableCell>
                  <TableCell>{item.model}</TableCell>
                  <TableCell align="center">{item.modelYear}</TableCell>
                  <TableCell align="center">{item.bodyType}</TableCell>
                  <TableCell align="center">{item.engineVariant}</TableCell>
                  <TableCell align="right" style={{ width: 100 }}>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDeleteClick(item.id)}
                        data-testid="deleteButton"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() =>
                          navigate(paths.editVehicleType({ id: item.id }))
                        }
                        data-testid="editButton"
                      >
                        <Edit />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: 73 * emptyRows,
                  }}
                >
                  <TableCell colSpan={4} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={vehicletypeList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default VehicleTypeList;
