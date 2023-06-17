import { QCallbackMessageStatus } from './QCallbackMessageStatus';

export interface QCallbackMessage {
  status: QCallbackMessageStatus;
  error?: string;
  data?: any;
}
