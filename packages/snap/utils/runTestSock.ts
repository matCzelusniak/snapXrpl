export const runWsClient = (): WebSocket => {
  const socket = new WebSocket(
    'wss://demo.piesocket.com/v3/channel_123?api_key=VCXCEuvhGcBDP7XhiJJUDvR1e1D3eiVjgZ9VRiaV&notify_self',
  );
  console.log('jajo socket', socket);
  socket.addEventListener('open', (event) => {
    console.log('jajoTest socket open', event);
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
    //getBalance(address, socket);
    //socket.close();
    //console.log('socket closed');
    //socket.send('Hello Server!', event);
  });

  socket.addEventListener('close', (event) => {
    console.log('jajo socket close', event);
    //socket.close();
    //console.log('socket closed');
    //socket.send('Hello Server!', event);
  });

  // socket.onmessage = (ev) => {
  //   console.log(ev);
  // };
  socket.addEventListener('message', (s) => {
    console.log('jajoTest Message from server ', s);
    //socket.close();
  });

  socket.addEventListener('error', (s) => {
    console.log('jajo error received', s);
  });

  return socket;
};
