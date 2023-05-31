import { SignatureRecord } from "./signature.record";

export class AssetConfirmationApiRecord extends SignatureRecord {
  trackedTimeStamp: number;
  deployId: string;
  debridgeId: string;
  nativeChainId: number;
  tokenDecimals: number;
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
}