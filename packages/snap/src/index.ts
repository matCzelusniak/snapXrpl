import { OnRpcRequestHandler } from '@metamask/snap-types';
import { generateSeedXrp } from '../utils/generateSeed';
import { generateWallet } from '../utils/generateWallet';
import Wallet from '../utils/wallet/Wallet';
import { addAccount, getAccountsAddresses } from '../utils/dbAgent';
import { signTransactionsOffline } from '../utils/signTransactionsOffline';
import { notify } from '../utils/notify';
import { getSeed } from '../utils/getSeed';
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
        const seed = await generateSeedXrp(randStr);
        const keys = generateWallet(seed);
        const walletXrpl = new Wallet(keys.publicKey, keys.privateKey, seed);
        await addAccount(walletXrpl, wallet);
        try {
          await notify(wallet, `Created ${walletXrpl.classicAddress}`);
        } catch (e) {
          console.log('notofication error', e);
        }
      }

      return;
    }

    case 'createXRPAccountBasedOnSeed': {
      const resultCfm = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'XRP Ledger Account creation',
            description: `Confirm that you want to upload XRP Ledger account based on seed ${request.params.seed}`,
            textAreaContent:
              'All data will be stored in your metamask in secure way. You can export it later.',
          },
        ],
      });

      if (resultCfm) {
        const keys = generateWallet(request.params.seed);

        const walletXrpl = new Wallet(
          keys.publicKey,
          keys.privateKey,
          request.params.seed,
        );

        await addAccount(walletXrpl, wallet);
        try {
          await notify(wallet, `Created ${walletXrpl.classicAddress}`);
        } catch (e) {
          console.log('notofication error', e);
        }
      }

      return;
    }

    case 'getXRPAccountsAddresses': {
      const accounts = await getAccountsAddresses(wallet);
      return accounts;
    }

    case 'signTransactionsOffline': {
      const resultCfm = await wallet.request({
        method: 'snap_confirm',
        params: [
          {
            prompt: 'XRP Ledger Transaction to cinfirm',
            description: `Confirm that you want to transfer XRP to ${request.params.txMsg.Destination}`,
            textAreaContent: 'Please confirm transaction or reject',
          },
        ],
      });

      if (resultCfm) {
        const txSign = await signTransactionsOffline(
          wallet,
          request.params.txMsg,
        );

        return txSign;
      }
      return false;
    }

    case 'getSeed': {
      return await getSeed(request.paramMethod, wallet);
    }

    default:
      throw new Error('Method not found.');
  }
};
