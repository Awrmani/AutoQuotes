module.exports = {
  rules: {
    /**
     * We need access to cypress "this", so sometimes arrow
     * functions will not do, as they are automatically binded
     */
    'func-names': ['off'],
    'prefer-arrow-callback': ['off'],
  },
};
