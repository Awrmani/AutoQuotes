import formContext from '@autoquotes/common/src/components/Form/formContext';
import {
  laborCostCal,
  partCostCal,
  toCurrency,
} from '@autoquotes/libraries/src/utils/calculation/calculation';
import { TableCell, TableRow } from '@mui/material';
import { useContext, useMemo } from 'react';

const Summary = () => {
  const { values } = useContext(formContext);
  const { lineItems } = values;

  const laborCost = useMemo(() => laborCostCal(lineItems), [lineItems]);
  const partCost = useMemo(() => partCostCal(lineItems), [lineItems]);
  const tax = useMemo(
    () => (laborCost + partCost) * 0.13,
    [laborCost, partCost]
  );

  return (
    <>
      {
        (lineItems,
        lineItems.length > 0 ? (
          <>
            <TableRow>
              <TableCell
                rowSpan={3}
                colSpan={1}
                sx={{ borderBottom: 'none' }}
              />
              <TableCell sx={{ borderBottom: 'none' }} align="right">
                Subtotal
              </TableCell>
              <TableCell
                sx={{ borderBottom: 'none' }}
                colSpan={2}
                align="right"
              >
                {toCurrency(laborCost + partCost)}
              </TableCell>
              <TableCell
                sx={{ width: 50, borderBottom: 'none' }}
                align="right"
              />
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderBottom: 'none' }} align="right">
                Tax
              </TableCell>
              <TableCell sx={{ borderBottom: 'none' }} align="right">{`${(
                0.13 * 100
              ).toFixed(0)} %`}</TableCell>
              <TableCell sx={{ borderBottom: 'none' }} align="right">
                {toCurrency(tax)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell sx={{ borderBottom: 'none' }} align="right">
                Total
              </TableCell>
              <TableCell
                sx={{ borderBottom: 'none' }}
                colSpan={2}
                align="right"
              >
                {toCurrency(laborCost + partCost + tax)}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={5}></TableCell>
            </TableRow>
          </>
        ) : null)
      }
    </>
  );
};

export default Summary;
