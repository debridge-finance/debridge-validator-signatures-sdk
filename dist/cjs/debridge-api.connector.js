"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DebridgeApiConnector = void 0;
const api_request_error_1 = require("./errors/api-request.error");
class DebridgeApiConnector {
    debridgeApi;
    constructor(debridgeApi) {
        this.debridgeApi = debridgeApi;
    }
    async getSubmissionConfirmations(submissionId, context) {
        context.logger.log(`[DebridgeApiConnector] getSubmissionConfirmations is started`);
        const response = await fetch(`${this.debridgeApi}/api/SubmissionConfirmations/getForSubmission?submissionId=${submissionId}`);
        if (response.status !== 200) {
            throw new api_request_error_1.ApiRequestError(`Can not download result from arweave`);
        }
        const confirmations = await response.json();
        context.logger.log(`[DebridgeApiConnector] etSubmissionConfirmations is finished`);
        context.logger.log(confirmations);
        return confirmations;
    }
    async getNewAssetConfirmationsByDebridgeId(debridgeId, context) {
        context.logger.log(`[DebridgeApiConnector] getNewAssetConfirmationsByDebridgeId is started`);
        const response = await fetch(`${this.debridgeApi}/api/ConfirmNewAssets/GetForDebridgeId?debridgeId=${debridgeId}`);
        if (response.status !== 200) {
            throw new api_request_error_1.ApiRequestError(`Can not download result from arweave`);
        }
        const confirmations = await response.json();
        context.logger.log(`[DebridgeApiConnector] getNewAssetConfirmationsByDebridgeId is finished`);
        context.logger.log(confirmations);
        return confirmations;
    }
}
exports.DebridgeApiConnector = DebridgeApiConnector;
//# sourceMappingURL=debridge-api.connector.js.map