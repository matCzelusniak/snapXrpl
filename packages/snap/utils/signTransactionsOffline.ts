import { sign } from 'ripple-keypairs';
//import Wallet from './wallet/Wallet';

export const signTransactionsOffline = async (
  message,
  privateKey,
  //   transaction: Transaction,
  //   multisign?: boolean | string,
) => {
  console.log('jajo xrpTest');
  console.log('jajo message', message);
  const test = sign(
    '3132333435363738',
    '003F5B389B80DDF527C8993EE145B4884DDFCD83A3C1C68231DFD72751AB1A0570',
  );
  console.log('jajo test111', test);
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