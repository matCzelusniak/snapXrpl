import { ErrorCodesE } from '../types/dataTypes';
// eslint-disable-next-line import/no-named-as-default
import ErrorBase from './ErrorBase';

export default class ErrorSocketNotConnected extends ErrorBase {
  public constructor(message: string) {
    super(message, ErrorCodesE.SOCKET_NOT_CONNECTED);
  }
}
