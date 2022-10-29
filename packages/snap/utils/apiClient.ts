// eslint-disable-next-line import/no-useless-path-segments, @typescript-eslint/no-unused-vars
import ErrorSocketNotConnected from './error/ErrorNotification';

enum ConnectionStatusE {
  IDLE,
  ONGOIING,
  CONNECTED,
}

const DEFAULT_ADDRESS = 'wss://s1.ripple.com/';

class Client {
  private static messageId = 1;

  private mSocket: WebSocket;

  private mConnectionStatus: ConnectionStatusE;

  public constructor() {
    this.mSocket = new WebSocket(DEFAULT_ADDRESS);
    this.mConnectionStatus = ConnectionStatusE.ONGOIING;
    console.log('init mSocket');
    this.mSocket.addEventListener('open', (event) => {
      console.log('[XRP_DEBUG] Socket connected', event);
      this.mConnectionStatus = ConnectionStatusE.CONNECTED;
    });

    this.mSocket.addEventListener('close', (event) => {
      console.log('[XRP_DEBUG] Socket closed', event);
      this.mConnectionStatus = ConnectionStatusE.IDLE;
    });

    this.mSocket.addEventListener('message', (event) => {
      console.log('[XRP_DEBUG] Socket message', event);
    });

    this.mSocket.addEventListener('error', (event) => {
      console.log('[XRP_DEBUG] Socket error', event);
    });
  }

  public getConnectionStatus(): ConnectionStatusE {
    return this.mConnectionStatus;
  }

  private send(message: string): void {
    if (this.mConnectionStatus !== ConnectionStatusE.CONNECTED) {
      throw new ErrorSocketNotConnected('Socket is not connected');
    }
    this.mSocket.send(message);
    Client.messageId += 1;
  }

  //todo matCzelusniak weboscket not supported by snaps at all
  // public async getBalance(address: string) {
  //   const request = {
  //     id: Client.messageId,
  //     command: 'account_info',
  //     account: address,
  //     strict: true,
  //     ledger_index: 'current',
  //     queue: true,
  //   };

  //   this.send(JSON.stringify(request));
  // }
}

export default class ApiClient {
  private static mClientInstance: Client | null = null;

  public static initApi() {
    if (ApiClient.mClientInstance === null) {
      ApiClient.mClientInstance = new Client();
    }
  }

  public static getApi(): Client {
    if (ApiClient.mClientInstance === null) {
      ApiClient.mClientInstance = new Client();
    }
    return ApiClient.mClientInstance;
  }
}
