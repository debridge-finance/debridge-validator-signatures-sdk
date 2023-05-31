import { Context, DebridgeArweaveClient } from "debridge-arweave-sdk";
import { SubmissionRecord } from "./types/submission.record";
import { AssetConfirmationRecord } from "./types/asset-confirmation.record";
import { DebridgeApiConnector } from "./debridge-api.connector";

type Config = {
  arweaveNode?: string;
  arweaveTxOwners?: string[];
  debridgeApi?: string;
};

export class DebridgeValidatorSignaturesClient {
  private arweaveClient: DebridgeArweaveClient;
  private isInited = false;
  private arweaveTxOwners: string[] = [];
  private debridgeApiConnector: DebridgeApiConnector;

  constructor() {
  }

  async init(config: Config) {
    if (this.isInited) throw new Error();
    if (config.arweaveTxOwners) {
      this.arweaveTxOwners = config.arweaveTxOwners;
    } else {
      const gitResponse = await fetch('https://raw.githubusercontent.com/debridge-finance/list-validators/main/validators.json');
      this.arweaveTxOwners = await gitResponse.json();
    }
    this.arweaveClient = new DebridgeArweaveClient(config.arweaveNode || 'https://arweave.net', this.arweaveTxOwners);
    this.debridgeApiConnector = new DebridgeApiConnector(config.debridgeApi || 'https://api.debridge.finance');

    this.isInited = true;
  }

  /**
   * Get signed submission transactions by id
   * @param submissionId
   * @param context
   */
  async getSubmissionConfirmations(submissionId: string, context: Context): Promise<SubmissionRecord[]> {
    const arweaveConfirmations = await this.arweaveClient.getSubmissionConfirmations(submissionId, context);
    context.logger.verbose(`[getSubmissionConfirmations] arweaveConfirmations by ${submissionId}: ${arweaveConfirmations.length}`);
    context.logger.verbose(`[getSubmissionConfirmations] arweaveConfirmations by ${submissionId}: ${JSON.stringify(arweaveConfirmations)}`);

    const arweaveSignatures = arweaveConfirmations.map(i => i.signature);

    const apiConfirmations = await this.debridgeApiConnector.getSubmissionConfirmations(submissionId, context);
    context.logger.verbose(`[getSubmissionConfirmations] apiConfirmations by ${submissionId}: ${apiConfirmations.length}`);
    context.logger.verbose(`[getSubmissionConfirmations] apiConfirmations by ${submissionId}: ${JSON.stringify(apiConfirmations)}`);

    const notExistsConfirmation = apiConfirmations.filter(it => arweaveSignatures.includes(it.signature)).map(it => {
      return {
        submissionId: it.submissionId,
        txHash: undefined,
        chainIdFrom: undefined,
        nonce: undefined,
        chainIdTo: undefined,
        bundlrTransactionId: undefined,
        signature: it.signature,
      } as SubmissionRecord;
    });

    return [...arweaveConfirmations, ...notExistsConfirmation];
  }

  /**
   * Get signed new asset confirmations transactions by debridgeId
   * @param debridgeId
   * @param context
   */
  async getNewAssetConfirmationsByDebridgeId(debridgeId: string, context: Context): Promise<AssetConfirmationRecord[]> {
    const arweaveConfirmations = await this.arweaveClient.getNewAssetConfirmationsByDebridgeId(debridgeId
      , context);
    context.logger.verbose(`[getNewAssetConfirmationsByDebridgeId] arweaveConfirmations by ${debridgeId}: ${arweaveConfirmations.length}`);
    context.logger.verbose(`[getNewAssetConfirmationsByDebridgeId] arweaveConfirmations by ${debridgeId}: ${JSON.stringify(arweaveConfirmations)}`);

    const arweaveSignatures = arweaveConfirmations.map(i => i.signature);

    const apiConfirmations = await this.debridgeApiConnector.getNewAssetConfirmationsByDebridgeId(debridgeId, context);
    context.logger.verbose(`[getNewAssetConfirmationsByDebridgeId] apiConfirmations by ${debridgeId}: ${apiConfirmations.length}`);
    context.logger.verbose(`[getNewAssetConfirmationsByDebridgeId] apiConfirmations by ${debridgeId}: ${JSON.stringify(apiConfirmations)}`);

    const notExistsConfirmation = apiConfirmations.filter(it => arweaveSignatures.includes(it.signature)).map(it => {
      return {
        deployId: it.deployId,
        debridgeId: it.debridgeId,
        nativeChainId: it.nativeChainId.toString(),
        tokenDecimals: it.tokenDecimals.toString(),
        tokenName: it.tokenName,
        tokenSymbol: it.tokenSymbol,
        tokenAddress: it.tokenAddress,
        signature: it.signature,
      } as AssetConfirmationRecord;
    });

    return [...arweaveConfirmations, ...notExistsConfirmation];
  }

  /**
   * Get signed new asset confirmations transactions from arweave by deployId
   * @param deployId
   * @param context
   */
  getNewAssetConfirmationsByDeployId(deployId: string, context: Context): Promise<AssetConfirmationRecord[]> {
    return this.arweaveClient.getNewAssetConfirmationsByDebridgeId(deployId, context);
  }

  /**
   * Get signed new asset confirmations transactions from arweave by tokenAddress
   * @param tokenAddress
   * @param nativeChainId
   * @param context
   */
   getNewAssetConfirmationsByTokenAddress(tokenAddress: string, nativeChainId: number, context: Context): Promise<AssetConfirmationRecord[]> {
    return this.arweaveClient.getNewAssetConfirmationsByDebridgeId(tokenAddress, context);
  }
}
