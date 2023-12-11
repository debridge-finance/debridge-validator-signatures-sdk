import { AssetConfirmationApiRecord } from "./types/asset-confirmation-api.record";
import { SubmissionApiRecord } from "./types/submission-api.record";
import { Context } from "debridge-arweave-sdk";
export declare class DebridgeApiConnector {
    private readonly debridgeApi;
    constructor(debridgeApi: string);
    getSubmissionConfirmations(submissionId: string, context: Context): Promise<SubmissionApiRecord[]>;
    getNewAssetConfirmationsByDebridgeId(debridgeId: string, context: Context): Promise<AssetConfirmationApiRecord[]>;
}
//# sourceMappingURL=debridge-api.connector.d.ts.map