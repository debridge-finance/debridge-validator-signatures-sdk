import { DebridgeArweaveClient } from "debridge-arweave-sdk";
import { DebridgeApiConnector } from "./debridge-api.connector";
export class DebridgeValidatorSignaturesClient {
    arweaveClient;
    isInited = false;
    debridgeApiConnector;
    validatorNames = new Map();
    constructor() {
    }
    async init(config) {
        if (this.isInited)
            throw new Error();
        let validators;
        if (config.validators) {
            validators = config.validators;
        }
        else {
            const gitResponse = await fetch('https://raw.githubusercontent.com/debridge-finance/list-validators/main/validators.json');
            validators = (await gitResponse.json());
        }
        validators.forEach(validator => {
            this.validatorNames.set(validator.validator, validator.name);
        });
        this.arweaveClient = new DebridgeArweaveClient(config.arweaveNode || 'https://arweave.net', validators);
        this.debridgeApiConnector = new DebridgeApiConnector(config.debridgeApi || 'https://api.debridge.finance');
        this.isInited = true;
    }
    /**
     * Get signed submission transactions by id
     * @param submissionId
     * @param context
     */
    async getSubmissionConfirmations(submissionId, context) {
        let arweaveConfirmations = [];
        try {
            arweaveConfirmations = await this.arweaveClient.getSubmissionConfirmations(submissionId, context);
            context.logger.verbose(`[getSubmissionConfirmations] arweaveConfirmations by ${submissionId}: ${arweaveConfirmations.length}`);
            context.logger.verbose(`[getSubmissionConfirmations] arweaveConfirmations by ${submissionId}: ${JSON.stringify(arweaveConfirmations)}`);
        }
        catch (e) {
            const error = e;
            context.logger.error(`Error in getting response from arweave: ${error.message}`);
        }
        const arweaveSignatures = arweaveConfirmations.map(i => i.signature);
        let apiConfirmations = [];
        try {
            apiConfirmations = await this.debridgeApiConnector.getSubmissionConfirmations(submissionId, context);
            context.logger.verbose(`[getSubmissionConfirmations] apiConfirmations by ${submissionId}: ${apiConfirmations.length}`);
            context.logger.verbose(`[getSubmissionConfirmations] apiConfirmations by ${submissionId}: ${JSON.stringify(apiConfirmations)}`);
        }
        catch (e) {
            const error = e;
            context.logger.error(`[getSubmissionConfirmations] Error in getting response from arweave: ${error.message}`);
        }
        const notExistsConfirmation = apiConfirmations.filter(it => !arweaveSignatures.includes(it.signature)).map(it => {
            return {
                submissionId: it.submissionId,
                txHash: undefined,
                chainIdFrom: undefined,
                nonce: undefined,
                chainIdTo: undefined,
                bundlrTransactionId: undefined,
                signature: it.signature,
                validator: it.validator,
            };
        });
        return [...arweaveConfirmations, ...notExistsConfirmation];
    }
    /**
     * Get signed new asset confirmations transactions by debridgeId
     * @param debridgeId
     * @param context
     */
    async getNewAssetConfirmationsByDebridgeId(debridgeId, context) {
        let arweaveConfirmations = [];
        try {
            arweaveConfirmations = await this.arweaveClient.getNewAssetConfirmationsByDebridgeId(debridgeId, context);
            context.logger.verbose(`[getNewAssetConfirmationsByDebridgeId] arweaveConfirmations by ${debridgeId}: ${arweaveConfirmations.length}`);
            context.logger.verbose(`[getNewAssetConfirmationsByDebridgeId] arweaveConfirmations by ${debridgeId}: ${JSON.stringify(arweaveConfirmations)}`);
        }
        catch (e) {
            const error = e;
            context.logger.error(`Error in getting response from arweave: ${error.message}`);
        }
        const arweaveSignatures = arweaveConfirmations.map(i => i.signature);
        let apiConfirmations = [];
        try {
            apiConfirmations = await this.debridgeApiConnector.getNewAssetConfirmationsByDebridgeId(debridgeId, context);
            context.logger.verbose(`[getNewAssetConfirmationsByDebridgeId] apiConfirmations by ${debridgeId}: ${apiConfirmations.length}`);
            context.logger.verbose(`[getNewAssetConfirmationsByDebridgeId] apiConfirmations by ${debridgeId}: ${JSON.stringify(apiConfirmations)}`);
        }
        catch (e) {
            const error = e;
            context.logger.error(`[getNewAssetConfirmationsByDebridgeId]  in getting response from arweave: ${error.message}`);
        }
        const notExistsConfirmation = apiConfirmations.filter(it => !arweaveSignatures.includes(it.signature)).map(it => {
            return {
                deployId: it.deployId,
                debridgeId: it.debridgeId,
                nativeChainId: it.nativeChainId.toString(),
                tokenDecimals: it.tokenDecimals.toString(),
                tokenName: it.tokenName,
                tokenSymbol: it.tokenSymbol,
                tokenAddress: it.tokenAddress,
                signature: it.signature,
                validator: it.validator,
            };
        });
        return [...arweaveConfirmations, ...notExistsConfirmation];
    }
    /**
     * Get signed new asset confirmations transactions from arweave by deployId
     * @param deployId
     * @param context
     */
    getNewAssetConfirmationsByDeployId(deployId, context) {
        return this.arweaveClient.getNewAssetConfirmationsByDebridgeId(deployId, context);
    }
    /**
     * Get signed new asset confirmations transactions from arweave by tokenAddress
     * @param tokenAddress
     * @param nativeChainId
     * @param context
     */
    getNewAssetConfirmationsByTokenAddress(tokenAddress, nativeChainId, context) {
        return this.arweaveClient.getNewAssetConfirmationsByDebridgeId(tokenAddress, context);
    }
}
//# sourceMappingURL=debridge-validator-signatures.client.js.map