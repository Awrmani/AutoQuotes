import { TOKEN_REMOVE, TOKEN_SET } from '../constants/actionTypes';

const tokenReducer = (state = null, { type, payload }) => {
  if (type === TOKEN_REMOVE) return null;
  if (type !== TOKEN_SET) return state;

  const { token } = payload ?? {};

  if (token) {
    return { token };
  }

  return state;
};

export default tokenReducer;

/**
 * SELECTORS
 */

const STATE_KEY = 'token';

export const getToken = state => state[STATE_KEY]?.token;
