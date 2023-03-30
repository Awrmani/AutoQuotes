import { useContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import formContext from '@autoquotes/common/src/components/Form/formContext';
import { updateQuote } from '../actions';

/**
 * This custom hook is responsible for
 * keeping the quote state up to date on
 * the Back-end
 */

const useQuoteUpdter = () => {
  const dispatch = useDispatch();
  const { values } = useContext(formContext);

  useEffect(() => {
    const { quoteId } = values ?? {};
    if (!quoteId) return;

    dispatch(updateQuote(values));
  }, [dispatch, values]);
};

export default useQuoteUpdter;
