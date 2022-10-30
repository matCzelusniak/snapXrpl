export const runWsClient = (): WebSocket => {
  const socket = new WebSocket(
    'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
  );

  socket.addEventListener('open', (event) => {
    const request = {
      id: 1,
      command: 'account_channels',
      account: 'rf1BiGeXwwQoi8Z2ueFYTEXSwuJYfV2Jpn',
      destination_account: 'ra5nK24KXen9AHvsdFTKHSANinZseWnPcX',
      ledger_index: 'validated',
    };

    socket.send(JSON.stringify(request));
  });

  socket.addEventListener('close', (event) => {
    console.log('socket close', event);
  });

  socket.addEventListener('message', (s) => {
    console.log('Message from server ', s);
  });

  socket.addEventListener('error', (s) => {
    console.log('error received', s);
  });

  return socket;
};
