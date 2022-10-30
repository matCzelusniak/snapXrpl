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
  const privateKey = await getPrivateKey(message.Account, walletSnap);
  const publicKey = await getPublicKey(message.Account, walletSnap);
  let txToSignAndEncode = { ...message };
  txToSignAndEncode.SigningPubKey = publicKey;

  txToSignAndEncode.TxnSignature = sign(
    encodeForSigning(txToSignAndEncode),
    privateKey,
  );

  const serialized = encode(txToSignAndEncode);

  return serialized;
};
