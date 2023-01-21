import { useEffect, useCallback, useRef, useMemo } from 'react';
import { useFormik } from 'formik';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { destroyForm } from '@autoquotes/libraries/src/actions';
import { getFormState } from '@autoquotes/libraries/src/reducers/formsReducer';

const useForm = ({
  onSuccess,
  action,
  validation,
  initialValues,
  enableReinitialize,
}) => {
  const formIdRef = useRef(uuid());
  const dispatch = useDispatch();
  const formikBagRef = useRef();
  const formState = useSelector(getFormState(formIdRef.current));
  const { isSucceeded, response, error } = formState ?? {};

  const onSubmit = useCallback(
    // We use formik imperatively, so we don't want to pass down a promise here
    (data, formikBag) => {
      if (!action) {
        // This form does not have an action, it should never have been submitted
        formikBag.setSubmitting(false);
      } else {
        dispatch(action(data, { formId: formIdRef.current }));
      }
    },
    [dispatch, action]
  );

  const validate = useCallback(
    (...props) => {
      if (!validation) return {};

      const errors = validation(...props);

      return errors;
    },
    [validation]
  );

  const formikBag = useFormik({
    initialValues,
    onSubmit,
    validate,
    enableReinitialize,
  });

  /**
   * Update formikBagRef when needed (This is to ensure no
   * useEffect runs on formikBag change)
   */
  formikBagRef.current = formikBag;

  // Hook responsible for error handling
  useEffect(() => {
    if (!error) return;

    const { setErrors, setSubmitting } = formikBagRef?.current ?? {};

    setSubmitting?.(false);

    const errorsToSet = {
      // Form level error
      ...(error?.error && { '*': error.error }),
      // Field level errors
      ...error?.fieldErrors,
    };

    if (Object.keys(errorsToSet).length) setErrors?.(errorsToSet);
  }, [error]);

  // Hook responsible for success handling
  useEffect(() => {
    if (!isSucceeded) return;

    formikBagRef.current?.setSubmitting(false);
    onSuccess?.({ response, formikBag: formikBagRef.current });
  }, [isSucceeded, onSuccess, response]);

  // Hook responsible for form destroy
  useEffect(() => {
    // Just to satisfy the linter rule copy the ref value into this closure
    const id = formIdRef.current;

    return () => {
      dispatch(destroyForm({}, { formId: id }));
    };
  }, [dispatch]);

  /**
   * The next few functions are here to make sure we are not
   * double submitting
   */
  const {
    handleSubmit: FBHandleSubmit,
    submitForm: FBSubmitForm,
    isSubmitting,
  } = formikBag;
  const handleSubmit = useCallback(
    e => {
      if (isSubmitting) {
        // If we are already submitting, stop here
        e.preventDefault?.();
        return false;
      }

      return FBHandleSubmit(e);
    },
    [FBHandleSubmit, isSubmitting]
  );

  const submitForm = useCallback(() => {
    // If we are already submitting, stop here
    if (isSubmitting) return;

    FBSubmitForm();
  }, [FBSubmitForm, isSubmitting]);

  const formikBagToExport = useMemo(
    () => ({
      ...formikBag,
      handleSubmit,
      submitForm,
    }),
    [formikBag, handleSubmit, submitForm]
  );

  return formikBagToExport;
};

export default useForm;
