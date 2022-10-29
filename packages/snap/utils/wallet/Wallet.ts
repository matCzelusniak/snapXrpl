/* eslint-disable import/no-extraneous-dependencies */
import { deriveAddress } from 'ripple-keypairs';

export default class Wallet {
  public readonly publicKey: string;

  public readonly privateKey: string;

  public readonly classicAddress: string;

  public readonly seed?: string;

  public constructor(publicKey: string, privateKey: string, seed: string) {
    this.publicKey = publicKey;
    this.privateKey = privateKey;
    this.classicAddress = deriveAddress(publicKey);
    this.seed = seed;
  }

  public getJsonStr(): string {
    return JSON.stringify({
      publicKey: this.publicKey,
      privateKey: this.privateKey,
      classicAddress: this.classicAddress,
      seed: this.seed,
    });
  }
}
