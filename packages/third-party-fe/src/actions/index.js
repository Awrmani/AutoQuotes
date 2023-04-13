import createAction from '@autoquotes/libraries/src/utils/createAction';
import * as actionTypes from '../constants/actionTypes';

// Async data fetches
export const fetchRequestedParts = createAction(
  actionTypes.REQUESTED_PARTS_FETCH
);

// Form submits & other actions altering backend state
export const offerParts = createAction(actionTypes.PARTS_OFFER);
