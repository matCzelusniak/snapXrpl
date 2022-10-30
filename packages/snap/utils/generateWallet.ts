/* eslint-disable import/no-extraneous-dependencies */
import { deriveKeypair } from 'ripple-keypairs';

export const generateWallet = (
  seed: string,
): {
  privateKey: string;
  publicKey: string;
} => {
  const { publicKey, privateKey } = deriveKeypair(seed);
  return { privateKey, publicKey };
};
