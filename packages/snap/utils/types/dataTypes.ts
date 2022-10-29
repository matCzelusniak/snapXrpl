export enum ErrorCodesE {
  NOTIFICATION_ERROR,
}

export type WalletSnap = {
  send(options: { method: string; params: unknown[] }): unknown;
  request(options: { method: string; params?: unknown[] }): unknown;
};
