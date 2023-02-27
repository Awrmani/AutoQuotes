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
import { getServiceList } from '../../reducers/queriesReducer';
import CustomTableHeader from './CustomTableHeader';
import { deleteService } from '../../actions';
import paths from '../../paths';

const ServiceList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const serviceList = useSelector(getServiceList);

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

    return serviceList.slice(from, to);
  }, [serviceList, page, rowsPerPage]);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, rowsPerPage - items.length);

  const handleDeleteClick = useCallback(
    id => {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete?')) {
        dispatch(deleteService({ id }));
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
                  data-testid={`service-${item.id}`}
                >
                  <TableCell component="th" scope="row">
                    {item.name}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {item.description}
                  </TableCell>
                  <TableCell align="right" style={{ width: 160 }}>
                    {item.timeInMinutes}
                  </TableCell>
                  <TableCell align="right" style={{ width: 160 }}>
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
                          navigate(paths.editService({ id: item.id }))
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
          count={serviceList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default ServiceList;
