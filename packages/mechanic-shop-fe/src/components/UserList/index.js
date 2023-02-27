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
import CustomTableHeader from './CustomTableHeader';
import paths from '../../paths';

import { deleteUser } from '../../actions';
import { getUserList } from '../../reducers/queriesReducer';

const UserList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const userList = useSelector(getUserList);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0); // Check
  };

  const users = useMemo(() => {
    const from = page * rowsPerPage;
    const to = from + rowsPerPage;

    return userList.slice(from, to);
  }, [userList, page, rowsPerPage]);

  // TODO Check
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = Math.max(0, rowsPerPage - users.length);

  const handleDeleteClick = useCallback(
    id => {
      // eslint-disable-next-line no-alert
      if (window.confirm('Are you sure you want to delete?')) {
        dispatch(deleteUser({ id }));
      }
    },
    [dispatch]
  );

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} size={'medium'}>
            <CustomTableHeader rowCount={users.length} />
            <TableBody>
              {users.map(user => (
                <TableRow hover key={user.id} data-testid={`user-${user.id}`}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell align="left" style={{ width: 200 }}>
                    {user.email}
                  </TableCell>
                  <TableCell align="left" style={{ width: 160 }}>
                    {user.phone}
                  </TableCell>
                  <TableCell role="right" style={{ width: 160 }}>
                    {user.role}
                  </TableCell>
                  <TableCell align="right" style={{ width: 160 }}>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDeleteClick(user.id)}
                        data-testid="deleteButton"
                      >
                        <Delete />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() =>
                          navigate(paths.editPart({ id: user.id }))
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
                  <TableCell colSpan={5} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 50, 100]}
          component="div"
          count={userList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default UserList;
