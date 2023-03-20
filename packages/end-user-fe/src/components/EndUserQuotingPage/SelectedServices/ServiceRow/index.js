import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Delete } from '@mui/icons-material';

const ServiceRow = props => {
  const { row } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ px: 0 }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.name}
        </TableCell>
        <TableCell align="right">{row.calories}</TableCell>
        <TableCell align="right">{row.fat}</TableCell>
        <TableCell align="right">{row.carbs}</TableCell>
        <TableCell align="right">{row.protein}</TableCell>
        <TableCell align="right">
          <Delete sx={{ color: 'red' }} />
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ mr: 0, ml: 14, mb: 2 }}>
              <Table size="small">
                {/* <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    <TableCell sx={{ fontWeight: 550 }}>Part</TableCell>
                    <TableCell
                      sx={{ fontWeight: 550, width: 120 }}
                      align="right"
                    >
                      Price
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 550, width: 120 }}
                      align="right"
                    >
                      Quantity
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 550, width: 120 }}
                      align="right"
                    >
                      Discount (%)
                    </TableCell>
                    <TableCell
                      sx={{ fontWeight: 550, width: 120 }}
                      align="right"
                    >
                      Price ($)
                    </TableCell>
                  </TableRow>
                </TableHead> */}
                <TableBody>
                  {row.history.map(historyRow => (
                    <TableRow key={historyRow.date}>
                      <TableCell component="th" scope="row">
                        {historyRow.date}
                      </TableCell>
                      <TableCell sx={{ width: 120 }} align="right">
                        {historyRow.customerId}
                      </TableCell>
                      <TableCell sx={{ width: 120 }} align="right">
                        {historyRow.amount}
                      </TableCell>
                      <TableCell sx={{ width: 120 }} align="right">
                        {historyRow.amount}
                      </TableCell>
                      <TableCell sx={{ width: 120 }} align="right">
                        {Math.round(historyRow.amount * row.price * 100) / 100}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

ServiceRow.propTypes = {
  row: PropTypes.shape({
    calories: PropTypes.number.isRequired,
    carbs: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    history: PropTypes.arrayOf(
      PropTypes.shape({
        amount: PropTypes.number.isRequired,
        customerId: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ).isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    protein: PropTypes.number.isRequired,
  }).isRequired,
};

export default ServiceRow;
