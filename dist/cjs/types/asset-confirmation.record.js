"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AssetConfirmationRecord = void 0;
const signature_record_1 = require("./signature.record");
class AssetConfirmationRecord extends signature_record_1.SignatureRecord {
    deployId;
    debridgeId;
    nativeChainId;
    tokenDecimals;
    tokenName;
    tokenSymbol;
    tokenAddress;
    bundlrTransactionId;
}
exports.AssetConfirmationRecord = AssetConfirmationRecord;
//# sourceMappingURL=asset-confirmation.record.js.map