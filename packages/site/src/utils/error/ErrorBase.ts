import { ErrorCodesE } from '../types/dataTypes';

export default class ErrorBase extends Error {
  private mErrorCode: ErrorCodesE;

  public constructor(message: string, errorCode: ErrorCodesE) {
    super(message);
    this.mErrorCode = errorCode;
  }
}
