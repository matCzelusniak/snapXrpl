export const getPublicKey = async (
  address: string,
  walletSnap,
): Promise<string> => {
  const xrplData = await walletSnap.request({
    method: 'snap_manageState',
    params: ['get'],
  });

  let publicKey = '';
  if (xrplData) {
    for (const account of xrplData?.xrp.accounts) {
      if (account.classicAddress === address) {
        publicKey = account.publicKey;
      }
    }
  }

  return publicKey;
};
