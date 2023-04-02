import { useContext, useMemo } from 'react';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { toCurrency } from '@autoquotes/libraries/src/utils/currency';
import { TableCell, TableRow } from '@mui/material';

const Summary = () => {
  const { values } = useContext(formContext);
  const { lineItems } = values;

  const { laborCostSum, laborTaxSum, timeInMinutesSum } = useMemo(
    () =>
      lineItems.reduce(
        (acc, { laborCost, laborTax, timeInMinutes }) => ({
          laborCostSum: acc.laborCostSum + laborCost,
          laborTaxSum: acc.laborTaxSum + laborTax,
          timeInMinutesSum: acc.timeInMinutesSum + timeInMinutes,
        }),
        {
          laborCostSum: 0,
          laborTaxSum: 0,
          timeInMinutesSum: 0,
        }
      ),
    [lineItems]
  );

  const { partsCost, partsTax } = useMemo(() => {
    let partsCostSum = 0;
    let partsTaxSum = 0;

    lineItems?.forEach(({ requiredParts }) => {
      requiredParts?.forEach(({ selected, options }) => {
        const { price = 0, partTax = 0 } =
          options?.find(({ id }) => id === selected) ?? {};

        partsCostSum += price;
        partsTaxSum += partTax;
      });
    });

    return { partsCost: partsCostSum, partsTax: partsTaxSum };
  }, [lineItems]);

  if (!lineItems?.length) return null;

  return (
    <>
      <TableRow sx={{ height: '150px' }} />
      <TableRow>
        <TableCell rowSpan={3} colSpan={1} sx={{ borderBottom: 'none' }} />
        <TableCell sx={{ borderBottom: 'none', fontWeight: 700 }} align="right">
          Labor
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }} align="right">
          {timeInMinutesSum / 60}
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }} align="right">
          {toCurrency(laborCostSum)}
        </TableCell>
        <TableCell sx={{ width: 50, borderBottom: 'none' }} align="right">
          {toCurrency(laborTaxSum)}
        </TableCell>
        <TableCell sx={{ width: 50, borderBottom: 'none' }} align="right">
          {toCurrency(laborTaxSum + laborCostSum)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ borderBottom: 'none', fontWeight: 700 }} align="right">
          Parts
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }} align="right" />
        <TableCell sx={{ borderBottom: 'none' }} align="right">
          {toCurrency(partsCost)}
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }} align="right">
          {toCurrency(partsTax)}
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }} align="right">
          {toCurrency(partsCost + partsTax)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell sx={{ borderBottom: 'none', fontWeight: 700 }} align="right">
          Total
        </TableCell>
        <TableCell sx={{ borderBottom: 'none' }} colSpan={3} align="right" />
        <TableCell sx={{ borderBottom: 'none' }} align="right">
          {toCurrency(laborCostSum + partsCost + laborTaxSum + partsTax)}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell colSpan={7}></TableCell>
      </TableRow>
    </>
  );
};

export default Summary;
