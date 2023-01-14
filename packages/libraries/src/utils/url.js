export const craftSearch = (input = {}) => {
  const crafted = new URLSearchParams();

  Object.keys(input).forEach(key => {
    const value = input[key];

    if (![null, undefined].includes(value)) crafted.append(key, value);
  });

  return crafted.toString();
};
