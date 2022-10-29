import { ErrorCodesE } from '../types/dataTypes';
// eslint-disable-next-line import/no-named-as-default
import ErrorBase from './ErrorBase';

export default class ErrorNotification extends ErrorBase {
  public constructor(message: string) {
    super(message, ErrorCodesE.NOTIFICATION_ERROR);
  }
}
