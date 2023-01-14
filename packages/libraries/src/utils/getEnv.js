export const getEnv = (name, lenient) => {
  const result = process.env[`REACT_APP_${name}`];

  if (result === undefined && !lenient) {
    // eslint-disable-next-line no-console
    console.error(`Missing ENV: REACT_APP_${name}`);
  }

  return result;
};
