import { Context } from "../../debridge-arweave-sdk";
import { AssetConfirmationApiRecord } from "./types/asset-confirmation-api.record";
import { SubmissionApiRecord } from "./types/submission-api.record";
export declare class DebridgeApiConnector {
    private readonly debridgeApi;
    constructor(debridgeApi: string);
    getSubmissionConfirmations(submissionId: string, context: Context): Promise<SubmissionApiRecord[]>;
    getNewAssetConfirmationsByDebridgeId(debridgeId: string, context: Context): Promise<AssetConfirmationApiRecord[]>;
}
//# sourceMappingURL=debridge-api.connector.d.ts.map