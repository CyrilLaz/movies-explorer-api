class TooManyRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'TooManyRequestError';
    this.statusCode = 429;
  }
}

module.exports = TooManyRequestError;
