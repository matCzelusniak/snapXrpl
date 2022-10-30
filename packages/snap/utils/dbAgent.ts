import Wallet from './wallet/Wallet';
import { WalletSnap } from './types/dataTypes';

/**
 *
 */
export async function addAccount(
  walletXrpl: Wallet,
  walletSnap: WalletSnap,
): Promise<void> {
  const xrplData = await walletSnap.request({
    method: 'snap_manageState',
    params: ['get'],
  });
  if (xrplData) {
    const walletsXrpl = xrplData.xrp.accounts;
    walletsXrpl.push(walletXrpl);
    await walletSnap.request({
      method: 'snap_manageState',
      params: [
        'update',
        {
          xrp: {
            accounts: walletsXrpl,
          },
        },
      ],
    });
  } else {
    await walletSnap.request({
      method: 'snap_manageState',
      params: [
        'update',
        {
          xrp: {
            accounts: [walletXrpl],
          },
        },
      ],
    });
  }
}

export async function getAccountsSeeds(
  walletSnap: WalletSnap,
): Promise<string[]> {
  const xrplData = await walletSnap.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  return (
    xrplData.xrp.accounts.map((account) =>
      Object.create({
        classicAddress: account.classicAddress,
        seed: account.seed,
      }),
    ) || []
  );
}

export async function getAccountsAddresses(
  walletSnap: WalletSnap,
): Promise<string[]> {
  const xrplData = await walletSnap.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  return xrplData?.xrp.accounts.map((account) => account.classicAddress) || [];
}
