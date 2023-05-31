export class ClientError extends Error {
    type;
    constructor(message, type) {
        super(message);
        this.type = type;
    }
}
//# sourceMappingURL=client.error.js.map