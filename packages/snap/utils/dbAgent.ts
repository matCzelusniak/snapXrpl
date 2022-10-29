import Wallet from './wallet/Wallet';
import { WalletSnap } from './types/dataTypes';

/**
 *
 */
export async function addAccount(
  walletXrpl: Wallet,
  walletSnap: WalletSnap,
): Promise<void> {
  console.log('jajo start');
  const xrplData = await walletSnap.request({
    method: 'snap_manageState',
    params: ['get'],
  });
  console.log('jajo addAccount', xrplData);
  if (xrplData) {
    console.log('jajo xrplData exists', xrplData);
    const walletsXrpl = xrplData.xrp.accounts;
    walletsXrpl.push(walletXrpl);
    console.log('jajo walletsXrpl', walletsXrpl);
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
    console.log('jajo xrplData', xrplData);
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

  console.log(
    'jajo xrplData',
    xrplData.xrp.accounts.map((account) =>
      Object.create({
        classicAddress: account.classicAddress,
        seed: account.seed,
      }),
    ) || [],
  );
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
  await getAccountsSeeds(walletSnap);
  const xrplData = await walletSnap.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  console.log(
    'jajo xrplData',
    xrplData.xrp.accounts.map((account) => account.classicAddress) || [],
  );
  return xrplData.xrp.accounts.map((account) => account.classicAddress) || [];
}
