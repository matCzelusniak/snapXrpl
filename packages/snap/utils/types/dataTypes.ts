export enum ErrorCodesE {
  SOCKET_NOT_CONNECTED,
}

export type WalletSnap = {
  send(options: { method: string; params: unknown[] }): unknown;
  request(options: { method: string; params?: unknown[] }): unknown;
};
