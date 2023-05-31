import { Context } from "debridge-arweave-sdk";
import { SubmissionRecord } from "./types/submission.record";
import { AssetConfirmationRecord } from "./types/asset-confirmation.record";
type Config = {
    arweaveNode?: string;
    arweaveTxOwners?: string[];
    debridgeApi?: string;
};
export declare class DebridgeValidatorSignaturesClient {
    private arweaveClient;
    private isInited;
    private arweaveTxOwners;
    private debridgeApiConnector;
    constructor();
    init(config: Config): Promise<void>;
    /**
     * Get signed submission transactions by id
     * @param submissionId
     * @param context
     */
    getSubmissionConfirmations(submissionId: string, context: Context): Promise<SubmissionRecord[]>;
    /**
     * Get signed new asset confirmations transactions by debridgeId
     * @param debridgeId
     * @param context
     */
    getNewAssetConfirmationsByDebridgeId(debridgeId: string, context: Context): Promise<AssetConfirmationRecord[]>;
    /**
     * Get signed new asset confirmations transactions from arweave by deployId
     * @param deployId
     * @param context
     */
    getNewAssetConfirmationsByDeployId(deployId: string, context: Context): Promise<AssetConfirmationRecord[]>;
    /**
     * Get signed new asset confirmations transactions from arweave by tokenAddress
     * @param tokenAddress
     * @param nativeChainId
     * @param context
     */
    getNewAssetConfirmationsByTokenAddress(tokenAddress: string, nativeChainId: number, context: Context): Promise<AssetConfirmationRecord[]>;
}
export {};
//# sourceMappingURL=debridge-validator-signatures.client.d.ts.map