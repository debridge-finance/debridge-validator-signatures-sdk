import { Context } from "../../debridge-arweave-sdk";
import { ApiRequestError } from "./errors/api-request.error";
import { AssetConfirmationApiRecord } from "./types/asset-confirmation-api.record";
import { SubmissionApiRecord } from "./types/submission-api.record";

export class DebridgeApiConnector {
  constructor(private readonly debridgeApi: string) {
  }

  async getSubmissionConfirmations(submissionId: string, context: Context): Promise<SubmissionApiRecord[]> {
    context.logger.log(`[DebridgeApiConnector] getSubmissionConfirmations is started`);
    const response = await fetch(`${this.debridgeApi}/api/SubmissionConfirmations/getForSubmission?submissionId=${submissionId}`);
    if (response.status !== 200) {
      throw new ApiRequestError(`Can not download result from arweave`);
    }

    const confirmations = await response.json();

    context.logger.log(`[DebridgeApiConnector] etSubmissionConfirmations is finished`);
    context.logger.log(confirmations);

    return confirmations;
  }

  async getNewAssetConfirmationsByDebridgeId(debridgeId: string, context: Context): Promise<AssetConfirmationApiRecord[]> {
    context.logger.log(`[DebridgeApiConnector] getNewAssetConfirmationsByDebridgeId is started`);
    const response = await fetch(`${this.debridgeApi}/api/ConfirmNewAssets/GetForDebridgeId?debridgeId=${debridgeId}`);
    if (response.status !== 200) {
      throw new ApiRequestError(`Can not download result from arweave`);
    }

    const confirmations = await response.json();

    context.logger.log(`[DebridgeApiConnector] getNewAssetConfirmationsByDebridgeId is finished`);
    context.logger.log(confirmations);

    return confirmations;
  }
}