/* eslint-disable import/no-extraneous-dependencies */
import { sign, verify } from 'ripple-keypairs';
import { getPrivateKey } from './getPrivateKey';
import { getPublicKey } from './getPublicKey';
import { WalletSnap } from './types/dataTypes';
import { encodeForSigning, encode } from 'ripple-binary-codec';

export const signTransactionsOffline = async (
  walletSnap: WalletSnap,
  message,
  address,
  //   transaction: Transaction,
  //   multisign?: boolean | string,
) => {
  console.log('jajo message xxx', message);
  console.log('jajo message xxx address', address);
  const privateKey = await getPrivateKey(
    'rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB',
    walletSnap,
  );
  console.log('jajo message xxx privateKey', privateKey);

  const publicKey = await getPublicKey(
    'rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB',
    walletSnap,
  );

  const tx = {
    TransactionType: 'Payment',
    Account: 'rP8fVjTPJ3imoSKgAQfU5M3AviJ7DY7AMB',
    Destination: 'rJayywgQKxYjMRjswc1eF9YBwtG5mgJ25J',
    Amount: '131000000000',
    Sequence: 32418809,
    Fee: '150000',
  };
  let txToSignAndEncode = { ...tx };
  txToSignAndEncode.SigningPubKey = publicKey;

  txToSignAndEncode.TxnSignature = sign(
    encodeForSigning(txToSignAndEncode),
    privateKey,
  );

  //console.log('jajo tx1', tx1);
  // const tstTx = { ...tx };
  // console.log('jajo tstTx', tstTx);
  // const msgToSign = encodeForSigning(tx);
  // console.log('jajo aaa msgToSign', msgToSign);
  // let signedMsg = {};
  // signedMsg.TxnSignature = sign(msgToSign, privateKey);
  // console.log('jajo aaa message xxx signedMsg11', signedMsg.TxnSignature);
  const serialized = encode(txToSignAndEncode);
  //   txToSignAndEncode.TxnSignature = computeSignature(
  //     txToSignAndEncode,
  //     this.privateKey,
  //   )
  // }
  return serialized;
  //   txToSignAndEncode.TxnSignature = computeSignature(
  //     txToSignAndEncode,
  //     this.privateKey,
  //   )
  // }

  // const serialized = encode(txToSignAndEncode)

  //const publicKey = await getPublicKey(address, walletSnap);
  // console.log(
  //   'jajo aaa message correct signedMsg',
  //   verify(message, signedMsg, publicKey),
  // );

  //return signedMsg;
  //   console.log('jajo xrpTest');
  //   console.log('jajo message', message);
  //   const test = sign(
  //     '3132333435363738',
  //     '003F5B389B80DDF527C8993EE145B4884DDFCD83A3C1C68231DFD72751AB1A0570',
  //   );
  //   console.log('jajo test111', test);
  //   return bytesToHex(
  //     Secp256k1.sign(hash(message), hexToBytes(privateKey), {
  //       canonical: true,
  //     }).toDER(),
  //   );
  //let xrpTest = new xrpl.Wallet(wallet.privateKey, wallet.privateKey);
  //   let multisignAddress: boolean | string = false;
  //   if (typeof multisign === 'string' && multisign.startsWith('X')) {
  //     multisignAddress = multisign;
  //   } else if (multisign) {
  //     multisignAddress = this.classicAddress;
  //   }
  //   const tx = { ...transaction };
  //   if (tx.TxnSignature || tx.Signers) {
  //     throw new ValidationError(
  //       'txJSON must not contain "TxnSignature" or "Signers" properties',
  //     );
  //   }
  //   removeTrailingZeros(tx);
  //   const txToSignAndEncode = { ...tx };
  //   txToSignAndEncode.SigningPubKey = multisignAddress ? '' : this.publicKey;
  //   if (multisignAddress) {
  //     const signer = {
  //       Account: multisignAddress,
  //       SigningPubKey: this.publicKey,
  //       TxnSignature: computeSignature(
  //         txToSignAndEncode,
  //         this.privateKey,
  //         multisignAddress,
  //       ),
  //     };
  //     txToSignAndEncode.Signers = [{ Signer: signer }];
  //   } else {
  //     txToSignAndEncode.TxnSignature = computeSignature(
  //       txToSignAndEncode,
  //       this.privateKey,
  //     );
  //   }
  //   const serialized = encode(txToSignAndEncode);
  //   this.checkTxSerialization(serialized, tx);
  //   return {
  //     tx_blob: serialized,
  //     hash: hashSignedTx(serialized),
  //   };
};
