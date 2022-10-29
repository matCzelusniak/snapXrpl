import { defaultSnapOrigin } from '../config';
import { GetSnapsResponse, Snap } from '../types';

/**
 * Get the installed snaps in MetaMask.
 *
 * @returns The snaps installed in MetaMask.
 */
export const getSnaps = async (): Promise<GetSnapsResponse> => {
  return (await window.ethereum.request({
    method: 'wallet_getSnaps',
  })) as unknown as GetSnapsResponse;
};

/**
 * Connect a snap to MetaMask.
 *
 * @param snapId - The ID of the snap.
 * @param params - The params to pass with the snap to connect.
 */
export const connectSnap = async (
  snapId: string = defaultSnapOrigin,
  params: Record<'version' | string, unknown> = {},
): string => {
  const result = await window.ethereum.request({
    method: 'wallet_enable',
    params: [
      {
        [`wallet_snap_${snapId}`]: {
          ...params,
        },
      },
    ],
  });
  //todo matCzelusniak workarround for problems with getSnaps
  let snapConnectedId = '';
  if (result.snaps) {
    for (const [, value] of Object.entries(result.snaps)) {
      if (value?.id) {
        snapConnectedId = value.id as string;
      }
    }
  }

  console.log('jajo snapConnectedId', result);
  return snapConnectedId;
};

/**
 * Get the snap from MetaMask.
 *
 * @param version - The version of the snap to install (optional).
 * @returns The snap object returned by the extension.
 */
export const getSnap = async (version?: string): Promise<Snap | undefined> => {
  try {
    //todo Mat that methods doesn't work. It calls too fast in chromium ?
    const snaps = await getSnaps();
    return Object.values(snaps).find(
      (snap) =>
        snap.id === defaultSnapOrigin && (!version || snap.version === version),
    );
  } catch (e) {
    console.log('Failed to obtain installed snap', e);
    return undefined;
  }
};

/**
 * Invoke the "connectSwap" method from the example snap.
 */

export const connectSwap = async () => {
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'connectSwap',
      },
    ],
  });
};

export const getXRPAccounts = async () => {
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'getXRPAccounts',
      },
    ],
  });
};

export const createXRPAccount = async () => {
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'createXRPAccount',
      },
    ],
  });
};

export const createXRPAccountBasedOnSeed = async (seed) => {
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'createXRPAccountBasedOnSeed',
        paramMethod: seed,
      },
    ],
  });
};

// export const createXRPAccountBasedOnSecret = async (secret) => {
//   return await window.ethereum.request({
//     method: 'wallet_invokeSnap',
//     params: [
//       defaultSnapOrigin,
//       {
//         method: 'createXRPAccountBasedOnSecret',
//         paramMethod: secret,
//       },
//     ],
//   });
// };

export const getXRPAccountsAddresses = async () => {
  return await window.ethereum.request({
    method: 'wallet_invokeSnap',
    params: [
      defaultSnapOrigin,
      {
        method: 'getXRPAccountsAddresses',
      },
    ],
  });
};
export const isLocalSnap = (snapId: string) => snapId.startsWith('local:');
