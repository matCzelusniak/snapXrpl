import { WalletSnap } from './types/dataTypes';
import ErrorNotification from './error/ErrorNotification';

/**
 * @throws {Error}
 */
export const notify = async (walletSnap: WalletSnap, message: string) => {
  try {
    await walletSnap.request({
      method: 'snap_notify',
      params: [
        {
          type: 'inApp',
          message: `${message}`,
        },
      ],
    });
  } catch (e) {
    console.log('jajo error', e);
    throw new ErrorNotification('inAppaccount creation issuse');
  }

  try {
    await walletSnap.request({
      method: 'snap_notify',
      params: [
        {
          type: 'inApp',
          message: `${message}`,
        },
      ],
    });
  } catch (e) {
    console.log('jajo error', e);
    throw new ErrorNotification('inAppaccount creation issuse');
  }
};
