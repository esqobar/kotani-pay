class CustomApiError extends Error {
    // constructor(message, statusCode) {
    constructor(message) {
        super(message)
        // this.statusCode = statusCode
    }
}

// const createCustomError = (message, statusCode) => {
//     return new CustomApiError(message, statusCode)
// }

module.exports = CustomApiError;
// module.exports = { createCustomError, CustomApiError }