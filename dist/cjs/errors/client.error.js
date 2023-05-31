"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientError = void 0;
class ClientError extends Error {
    type;
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}
exports.ClientError = ClientError;
//# sourceMappingURL=client.error.js.map