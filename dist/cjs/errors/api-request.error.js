"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRequestError = void 0;
const client_error_1 = require("./client.error");
class ApiRequestError extends client_error_1.ClientError {
    constructor(message) {
        super(message, ApiRequestError.name);
    }
}
exports.ApiRequestError = ApiRequestError;
//# sourceMappingURL=api-request.error.js.map