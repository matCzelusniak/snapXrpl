/* eslint-disable import/no-extraneous-dependencies */
import { sign, verify } from 'ripple-keypairs';
import { getPrivateKey } from './getPrivateKey';
import { getPublicKey } from './getPublicKey';
import { WalletSnap } from './types/dataTypes';
import { encodeForSigning, encode } from 'ripple-binary-codec';

export const signTransactionsOffline = async (
  walletSnap: WalletSnap,
  message,
  //   transaction: Transaction,
  //   multisign?: boolean | string,
) => {
  console.log('jajo message xxx', message);
  const privateKey = await getPrivateKey(message.Account, walletSnap);
  console.log('jajo message xxx privateKey', privateKey);

  const publicKey = await getPublicKey(message.Account, walletSnap);

  // const tx = {
  //   TransactionType: 'Payment',
  //   Account: 'rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB',
  //   Destination: 'rJayywgQKxYjMRjswc1eF9YBwtG5mgJ25J',
  //   Amount: '131000000000',
  //   Sequence: 32418809,
  //   Fee: '150000',
  // };
  let txToSignAndEncode = { ...message };
  txToSignAndEncode.SigningPubKey = publicKey;

  txToSignAndEncode.TxnSignature = sign(
    encodeForSigning(txToSignAndEncode),
    privateKey,
  );

  const serialized = encode(txToSignAndEncode);

  return serialized;
};
