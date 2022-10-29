export const getBalance = async (address: string, socket: WebSocket | null) => {
  if (socket === null) {
    throw Error('give me socket instance');
  }

  // const request = {
  //   command: 'account_info',
  //   account: address,
  // };

  const request = {
    id: 1,
    command: 'account_channels',
    account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
    destination_account: 'ra5nK24KXen9AHvsdFTKHSANinZseWnPcX',
    ledger_index: 'validated',
  };
  //todo eczemat update id on fly
  //const newRequest = JSON.stringify({ ...request);
  console.log('jajo newRequest', JSON.stringify(request));
  socket.send(JSON.stringify(request));
};
