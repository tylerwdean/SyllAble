class APIResult {
  constructor(status, message, error = null) {
    this.status = status;
    this.message = message;
    this.error = error;
  }
}

module.exports = APIResult;
