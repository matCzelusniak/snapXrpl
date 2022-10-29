export const getPrivateKey = async (
  address: string,
  walletSnap,
): Promise<string> => {
  console.log('start checking private key 000');
  const xrplData = await walletSnap.request({
    method: 'snap_manageState',
    params: ['get'],
  });
  console.log('start checking private key');
  let privateKey = '';
  if (xrplData) {
    for (const account of xrplData?.xrp.accounts) {
      if (account.classicAddress === address) {
        privateKey = account.privateKey;
        console.log('jajo private key ok', account);
      }
    }
  }

  return privateKey;
};
