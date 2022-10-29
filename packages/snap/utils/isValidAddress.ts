// eslint-disable-next-line @typescript-eslint/no-unused-vars, import/no-extraneous-dependencies
import { isValidClassicAddress } from 'ripple-address-codec';

export const isValidAddress = (address: string) => {
  return true;
  return isValidClassicAddress(address);
};
