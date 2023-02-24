class NotFoundError extends Error {
  constructor() {
    super('The requested resource was not found');
  }
}

module.exports = NotFoundError;
