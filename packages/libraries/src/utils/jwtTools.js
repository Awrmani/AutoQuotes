export const parseJWT = jwtToken => {
  if (!jwtToken) {
    return null;
  }
  try {
    const [, rawPayload] = jwtToken.split('.');
    const payload = JSON.parse(atob(rawPayload));

    return payload;
  } catch (e) {
    throw new Error(`Cannot deserialize JWT token: ${e.message}`);
  }
};
