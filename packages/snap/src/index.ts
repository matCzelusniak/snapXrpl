import { OnRpcRequestHandler } from '@metamask/snap-types';
import { generateSeedXrp } from '../utils/generateSeed';
import { generateWallet } from '../utils/generateWallet';
import Wallet from '../utils/wallet/Wallet';
import { addAccount, getAccountsAddresses } from '../utils/dbAgent';
import { notify } from '../utils/notify';
//import { getBalance } from '../utils/getBalance';
// eslint-disable-next-line import/no-extraneous-dependencies, @typescript-eslint/no-unused-vars, import/order

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Handle incoming JSON-RPC requests, sent through `wallet_invokeSnap`.
 *
 * @param args - The request handler args as object.
 * @param args.origin - The origin of the request, e.g., the website that
 * invoked the snap.
 * @param args.request - A validated JSON-RPC request object.
 * @returns `null` if the request succeeded.
 * @throws If the request method is not valid for this snap.
 * @throws If the `snap_confirm` call failed.
 */
export const onRpcRequest: OnRpcRequestHandler = async ({
  origin,
  request,
}) => {
  switch (request.method) {
    case 'getXRPAccounts': {
      await wallet.request({
        method: 'snap_manageState',
        params: ['update', { hello: 'world' }],
      });
      const persistedData = await wallet.request({
        method: 'snap_manageState',
        params: ['get'],
      });
      return;
    }

    case 'createXRPAccount': {
      const resultCfm = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'XRP Ledger Account creation',
            description:
              'Confirm that you want to create a new XRP Ledger account',
            textAreaContent:
              'All data will be stored in your metamask in secure way. You can export it later.',
          },
        ],
      });

      if (resultCfm) {
        const randStr: string = (Math.random() + 1).toString(36);
        console.log('jajo - randStr', randStr);
        const seed = await generateSeedXrp(randStr);
        console.log('jajo seed', seed);
        const keys = generateWallet(seed);
        console.log('jajo keys', keys);
        const walletXrpl = new Wallet(keys.publicKey, keys.privateKey, seed);
        console.log('jajo wallet', walletXrpl);
        await addAccount(walletXrpl, wallet);
        try {
          await notify(wallet, `Created ${walletXrpl.classicAddress}`);
        } catch (e) {
          console.log('jajo notofication error', e);
        }

        // const xrplData = await wallet.request({
        //   method: 'snap_manageState',
        //   params: ['get'],
        // });

        // if (!xrplData) {
        //   await wallet.request({
        //     method: 'snap_manageState',
        //     params: [
        //       'update',
        //       {
        //         xrp: {
        //           accounts: [walletXrpl],
        //         },
        //       },
        //     ],
        //   });
        // }

        //console.log('jajo accounts', accounts);
      }

      //getJsonStr;

      return;
    }

    case 'getXRPAccountsAddresses': {
      const accounts = await getAccountsAddresses(wallet);
      console.log('jajo accounts', accounts);
      return accounts;
    }

    default:
      throw new Error('Method not found.');
  }
};
