import * as actionTypes from '../constants/actionTypes';

/*
 * This function gets an async "trigger action" as param,
 * It then mines the triggerActionId and instructs take()
 * to wait for that async action to finish
 *
 * Usage:
 * const asyncActionResult = yield take(waitFor(yield put(actionTypes.doSg({ params }))))
 */
export const waitFor = triggerAction => {
  const waitForId = triggerAction?.meta?.actionId;

  if (typeof waitForId !== 'string')
    throw new Error(
      'The awaited async trigger action Id is expected to be a string'
    );

  return testedAction => {
    const testedId = testedAction?.meta?.triggerActionId;

    if (!testedId) return false;

    return (
      waitForId === testedId &&
      [
        actionTypes.REQUEST_SUCCESS,
        actionTypes.REQUEST_FAILURE,
        actionTypes.QUERY_CANCEL,
      ].includes(testedAction.type)
    );
  };
};
