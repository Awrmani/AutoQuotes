import * as actionTypes from '../constants/actionTypes';

/**
 * This FN makes redux devtools messages more readable
 *
 * Displays either the trigger action id, or the action id
 * in the redux devtools line, as well as an emoji if it is
 * an async process action (pending / success / failure / cancel)
 */

const emojiMap = {
  [actionTypes.REQUEST_PENDING]: String.fromCodePoint(9203),
  [actionTypes.REQUEST_SUCCESS]: String.fromCodePoint(9989),
  [actionTypes.REQUEST_FAILURE]: String.fromCodePoint(10060),
  [actionTypes.QUERY_CANCEL]: String.fromCodePoint(9995),
};

const devtoolsActionSanitizer = action => {
  const { type, meta } = action;
  const id = meta?.triggerActionId ?? meta?.actionId;

  if (!id) return action;

  // Get the triggerActionId, or actionId of this is a trigger action

  if (!meta.triggerActionType)
    return { ...action, type: `${type} [${id.substring(0, 4)}]` };

  return {
    ...action,
    type: `${meta.triggerActionType} [${id.substring(0, 4)}] => ${
      emojiMap[type] ?? ''
    } ${type}`,
  };
};

export default devtoolsActionSanitizer;
