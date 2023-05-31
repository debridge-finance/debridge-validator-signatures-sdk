import { ClientError } from "./client.error";
export class ApiRequestError extends ClientError {
    constructor(message) {
        super(message, ApiRequestError.name);
    }
}
//# sourceMappingURL=api-request.error.js.map