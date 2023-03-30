import { useContext, useMemo } from 'react';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { toCurrency } from '@autoquotes/libraries/src/utils/currency';
import { TableCell, TableRow } from '@mui/material';

const Summary = () => {
  const { values } = useContext(formContext);
  const { lineItems } = values;

  const laborCostSum = useMemo(
    () => lineItems.reduce((acc, { laborCost }) => acc + laborCost, 0),
    [lineItems]
  );
  const partCost = useMemo(() => {
    let cost = 0;

    lineItems?.forEach(({ requiredParts }) => {
      requiredParts?.forEach(({ selected, options }) => {
        const { price = 0 } = options?.find(({ id }) => id === selected) ?? {};

        cost += price;
      });
    });

    return cost;
  }, [lineItems]);

  const tax = useMemo(
    () => (laborCostSum + partCost) * 0.13,
    [laborCostSum, partCost]
  );

  if (!lineItems?.length) return null;

  return (
    <>
      <TableRow>
        <TableCell rowSpan={3} colSpan={1} sx={{ borderBottom: 'none' }} />
        <TableCell sx={{ borderBottom: 'none' }} align="right">
          Subtotal
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }} colSpan={2} align="right">
          {toCurrency(laborCostSum + partCost)}
        </TableCell>
        <TableCell sx={{ width: 50, borderBottom: 'none' }} align="right" />
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
        <TableCell sx={{ borderBottom: 'none' }} colSpan={2} align="right">
          {toCurrency(laborCostSum + partCost + tax)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={5}></TableCell>
      </TableRow>
    </>
  );
};

export default Summary;
