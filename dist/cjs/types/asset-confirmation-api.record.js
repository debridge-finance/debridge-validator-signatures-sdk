"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetConfirmationApiRecord = void 0;
const signature_record_1 = require("./signature.record");
class AssetConfirmationApiRecord extends signature_record_1.SignatureRecord {
    trackedTimeStamp;
    deployId;
    debridgeId;
    nativeChainId;
    tokenDecimals;
    tokenName;
    tokenSymbol;
    tokenAddress;
}
exports.AssetConfirmationApiRecord = AssetConfirmationApiRecord;
//# sourceMappingURL=asset-confirmation-api.record.js.map