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

export async function getAccountsAddresses(
  walletSnap: WalletSnap,
): Promise<string[]> {
  const xrplData = await walletSnap.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  console.log('jajo xrplData', xrplData);
  return [];

  //   if (!xrplData) {
  //     await walletSnap.request({
  //       method: 'snap_manageState',
  //       params: [
  //         'update',
  //         {
  //           xrp: {
  //             accounts: [walletXrpl],
  //           },
  //         },
  //       ],
  //     });
  //   }
}
