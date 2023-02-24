class InvalidSearchCriteriaError extends Error {
  constructor() {
    super('Invalid search criteria');
  }
}

module.exports = InvalidSearchCriteriaError;
