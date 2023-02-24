import React, { useEffect, useMemo, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Stack, CircularProgress } from '@mui/material';
import { Form } from '@autoquotes/common/src/components/Form';
import validatorFactory, {
  subValidator,
} from '@autoquotes/libraries/src/utils/validation';
import stringValidators from '@autoquotes/libraries/src/utils/validation/string';
import numberValidators from '@autoquotes/libraries/src/utils/validation/number';
import ShopSettingsForm from '../components/ShopSettingsForm';
import { fetchShopSettings, updateShopSettings } from '../actions';
import { getShopSettingsQuery } from '../reducers/queriesReducer';
import paths from '../paths';

const dayValidator = subValidator({
  openHour: stringValidators.asNumber(numberValidators.isNumberOrUndefined),
  openMinute: stringValidators.asNumber(numberValidators.isNumberOrUndefined),
  closeHour: stringValidators.asNumber(numberValidators.isNumberOrUndefined),
  closeMinute: stringValidators.asNumber(numberValidators.isNumberOrUndefined),
});

const validator = validatorFactory({
  name: [stringValidators.required],
  slogan: [stringValidators.required],
  email: [stringValidators.required],
  phone: [stringValidators.required],
  numberOfStalls: [stringValidators.asNumber(numberValidators.required)],
  returnPolicyUrl: [stringValidators.required],
  termsAndConditionsUrl: [stringValidators.required],
  privacyPolicyUrl: [stringValidators.required],
  address1: [stringValidators.required],
  address2: [stringValidators.isString],
  zip: [stringValidators.required],
  city: [stringValidators.required],
  state: [stringValidators.required],
  country: [stringValidators.required],
  openingHours: subValidator({
    monday: dayValidator,
    tuesday: dayValidator,
    wednesday: dayValidator,
    thursday: dayValidator,
    friday: dayValidator,
    saturday: dayValidator,
    sunday: dayValidator,
  }),
});

const ShopSettingsScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchShopSettings());
  }, [dispatch]);

  // Extract the details from the redux store
  const shopSettingsQuery = useSelector(getShopSettingsQuery);
  const { isFetching, result } = shopSettingsQuery ?? {};

  // Create the form initial values, prefill the current details of the entity
  const initialValues = useMemo(
    () => ({
      ...result,
      logo: { isNew: false, uri: result?.logo },
    }),
    [result]
  );

  const handleSuccess = useCallback(() => {
    navigate(paths.dashboard());
  }, [navigate]);

  // DO not render while data is fetching from the BE
  if (isFetching)
    return (
      <Stack alignItems="center">
        <CircularProgress sx={{ mt: 8 }} size={64} />
      </Stack>
    );

  return (
    <Form
      initialValues={initialValues}
      validation={validator}
      action={updateShopSettings}
      onSuccess={handleSuccess}
    >
      <ShopSettingsForm />
    </Form>
  );
};

export default ShopSettingsScreen;
