// eslint-disable-next-line no-use-before-define, import/no-extraneous-dependencies
import { generateSeed } from 'ripple-keypairs';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { sha256 } from './sha256';

export const generateSeedXrp = async (secretKey: string) => {
  const sha = await sha256(secretKey);
  const seed = generateSeed({
    entropy: sha,
    algorithm: 'ecdsa-secp256k1',
  });

  return seed;
};
