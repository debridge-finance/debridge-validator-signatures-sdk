"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionRecord = void 0;
const signature_record_1 = require("./signature.record");
class SubmissionRecord extends signature_record_1.SignatureRecord {
    submissionId;
    txHash;
    chainIdFrom;
    nonce;
    chainIdTo;
    bundlrTransactionId;
}
exports.SubmissionRecord = SubmissionRecord;
//# sourceMappingURL=submission.record.js.map