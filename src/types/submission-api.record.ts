import { SignatureRecord } from "./signature.record";

export class SubmissionApiRecord extends SignatureRecord {
  submissionId: string;
  id: string;
  trackedTimeStamp: number;
  validatorName: string;
}
