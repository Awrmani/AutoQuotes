import React, { useContext, useMemo } from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableCell } from '@mui/material';
import { Field } from '@autoquotes/common/src/components/Form';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import Dropdown from '@autoquotes/common/src/components/Dropdown';
import PartDetailsField from '../PartDetailsField';

const SelectedPart = ({ lineItemIndex, requiredPartIndex }) => {
  const { values } = useContext(formContext);
  const requiredPart =
    values?.lineItems?.[lineItemIndex]?.requiredParts?.[requiredPartIndex];

  const options = useMemo(
    () =>
      requiredPart?.options.map(
        ({ id, name, manufacturer, type, warrantyMonths }) => ({
          value: id,
          label: `${name}${manufacturer ? ` - ${manufacturer}` : ''} (${type})${
            warrantyMonths ? ` - ${warrantyMonths} months` : ''
          }`,
        })
      ),
    [requiredPart]
  );

  return (
    <TableRow key={requiredPart.name}>
      <TableCell sx={{ borderBottom: 'none' }}></TableCell>
      <TableCell
        colSpan={2}
        sx={{
          paddingLeft: 5,
          borderBottom: 'none',
        }}
        component="th"
        scope="row"
      >
        <Field
          fontSize="small"
          component={Dropdown}
          name={`lineItems.${lineItemIndex}.requiredParts.${requiredPartIndex}.selected`}
          label={`${requiredPart.name}${
            !options.length ? ' (not in stock)' : ''
          }`}
          fullWidth
          options={options}
          disabled={values.isFinalized || !options.length}
        />
      </TableCell>

      <Field
        component={PartDetailsField}
        name={`lineItems.${lineItemIndex}.requiredParts.${requiredPartIndex}.selected`}
        options={requiredPart.options}
      />
    </TableRow>
  );
};

SelectedPart.propTypes = {
  lineItemIndex: PropTypes.number.isRequired,
  requiredPartIndex: PropTypes.number.isRequired,
};

export default SelectedPart;
