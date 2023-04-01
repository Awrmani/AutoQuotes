import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { updateQuote } from '../actions';

/**
 * This custom hook is responsible for
 * keeping the quote state up to date on
 * the Back-end
 */

const useQuoteUpdater = () => {
  const dispatch = useDispatch();
  const { values, initialValues } = useContext(formContext);

  useEffect(() => {
    const { quoteId } = values ?? {};
    if (!quoteId) return;

    // If we are reloading info, do not send update to BE
    if (values === initialValues) return;

    dispatch(updateQuote(values));
  }, [dispatch, values, initialValues]);
};

export default useQuoteUpdater;
