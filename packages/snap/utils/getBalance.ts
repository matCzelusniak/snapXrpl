export const getBalance = async (address: string, socket: WebSocket | null) => {
  if (socket === null) {
    throw Error('give me socket instance');
  }
  const request = {
    id: 2,
    command: 'account_info',
    account: address,
    strict: true,
    ledger_index: 'current',
    queue: true,
  };

  socket.send(JSON.stringify(request));
};
