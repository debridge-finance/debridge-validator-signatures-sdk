# debridge-validator-signatures-sdk
SDK for finding all signatures by submission ID in the Arweave network (stored by Bunldr) or in debridge api if not exists in arweave and performing web3 erecover() for validating the signatures. 
The SDK supports searching only for transactions that were created by specific addresses. The same for searching new assets by tokenName, deployId, debridgeId.

# How to use

```typescript
const client = new DebridgeValidatorSignaturesClient();
await client.init({
  arweaveNode: 'https://arweave.net', //default https://arweave.net
  arweaveTxOwners: undefined, //default addreses from https://raw.githubusercontent.com/debridge-finance/list-validators/main/validators.json
  debridgeApi: 'https://api.debridge.finance', default, //default https://api.debridge.finance
});
```

For using a sdk you should have a context that contains logger(see types).

Get signatures by submission id:
```typescript
client.getSubmissionConfirmations('0xcaa800ead1e369cae024dda4b46716674f88807416e7581a939d4f05db4002f4', context)
```

Returns
```typescript
signature: string;
validator: string;
submissionId: string;
txHash?: string;
chainIdFrom?: string;
nonce?: string;
chainIdTo?: string;
bundlrTransactionId?: string;
```
txHash, chainIdFrom, nonce, chainIdTo, bundlrTransactionId are not presented in records from debridge api.


Get signatures by debridgeId:
```typescript
client.getNewAssetConfirmationsByDebridgeId('0x15db45753160f76964dfa867510c9ede0ac87ac9ce24771de7efa0dab8251c1a', context)
```
Returns
```typescript
signature: string;
validator: string;
deployId: string;
debridgeId: string;
nativeChainId: string;
tokenDecimals: string;
tokenName: string;
tokenSymbol: string;
tokenAddress: string;
bundlrTransactionId?: string;
```
bundlrTransactionId is not presented in records from debridge api.
