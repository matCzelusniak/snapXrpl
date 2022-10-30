/* eslint-disable import/order */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line import/no-useless-path-segments, @typescript-eslint/no-unused-vars
import ErrorSocketNotConnected from './error/ErrorSocketNotConnected';

enum ConnectionStatusE {
  IDLE,
  ONGOIING,
  CONNECTED,
}

const DEFAULT_ADDRESS = 'wss://s.altnet.rippletest.net:51233';
class Client {
  private static messageId = 1;

  private mQueryMap: Map<number, string>;

  private mSocket: WebSocket;

  private mConnectionStatus: ConnectionStatusE;

  private mStore;

  public constructor(store) {
    this.mSocket = new WebSocket(DEFAULT_ADDRESS);
    this.mConnectionStatus = ConnectionStatusE.ONGOIING;
    this.mStore = store;
    this.mQueryMap = new Map();
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
      const parsedData = JSON.parse(event.data);
      console.log('[XRP_DEBUG] Socket message', parsedData);
      if (parsedData.status === 'success') {
        console.log('jajo dd1', parsedData);
        if (this.mQueryMap.has(parsedData.id)) {
          const method = this.mQueryMap.get(parsedData.id);
          switch (method) {
            case 'account_info': {
              let accountsSlice = this.mStore.getState().accounts.slice();
              const accountReceived = parsedData.result.account_data.Account;
              accountsSlice.find((element, index, array) => {
                if (element.classicAddress === accountReceived) {
                  array[index].balance = parsedData.result.account_data.Balance;
                  return true;
                }
                return false;
              });

              this.mStore.dispatch({
                type: 'SET_ACCOUNTS',
                payload: accountsSlice,
              });
              break;
            }

            default: {
              break;
            }
          }
          this.mQueryMap.delete(parsedData.id);
        }
      } else {
        switch (parsedData.request.command) {
          case 'account_info': {
            if (
              parsedData.status === 'error' &&
              parsedData.error === 'actNotFound'
            ) {
              let accountsSlice = this.mStore.getState().accounts.slice();
              accountsSlice.find((element, index, array) => {
                if (element.classicAddress === parsedData.account) {
                  array[index].balance = -1;
                  return true;
                }
                return false;
              });

              this.mStore.dispatch({
                type: 'SET_ACCOUNTS',
                payload: accountsSlice,
              });
            }
            break;
          }

          default: {
            break;
          }
        }
        this.mQueryMap.delete(parsedData.id);
      }
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

  public async getBalance(address: string) {
    const request = {
      id: Client.messageId,
      command: 'account_info',
      account: address,
      strict: true,
      ledger_index: 'current',
      queue: true,
    };
    this.mQueryMap.set(request.id, request.command);
    this.send(JSON.stringify(request));
  }

  public async submitTx(txHex: string) {
    const request = {
      id: 'example_submit',
      command: 'submit',
      tx_blob: txHex,
    };
    this.mQueryMap.set(request.id, request.command);
    console.log('jajo submitTx string', JSON.stringify(request));
    this.send(JSON.stringify(request));
  }

  public async submitSign(txReady) {
    //this.mQueryMap.set(request.id, request.command);
    console.log('jajo submitTx submitSign', JSON.stringify(txReady));
    this.send(JSON.stringify(txReady));
  }
}

export default class ApiClient {
  private static mClientInstance: Client | null = null;

  private static mStore = null;

  public static initApi() {
    if (ApiClient.mClientInstance === null) {
      ApiClient.mClientInstance = new Client(ApiClient.mStore);
    }
  }

  public static getApi(): Client {
    if (ApiClient.mClientInstance === null) {
      ApiClient.mClientInstance = new Client(ApiClient.mStore);
    }
    return ApiClient.mClientInstance;
  }

  public static setStore(store) {
    ApiClient.mStore = store;
  }
}
