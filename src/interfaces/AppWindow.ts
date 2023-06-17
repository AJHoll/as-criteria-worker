import { QCallbackMessage } from './QCallbackMessage';
import { QOperation } from './QOperation';
import QRequest from '../classes/QRequest';
import { Channels } from '../main/interfaces/Channels';

export interface AppWindow extends Window {
  api: {
    controls: {
      minimize: () => void;
      toggleMaximize: () => void;
      close: () => void;
      isMaximized: () => boolean;
    }
    ipcRenderer: {
      send: (channel: Channels, args: unknown[]) => void;
      on: (channel: Channels, func: (...args: unknown[]) => void) => void;
      once: (channel: Channels, func: (...args: unknown[]) => void) => void;
    }
    config: {
      getConfig: () => Promise<JSON>;
    },
    db: {
      isConnected: () => boolean,
      openConnection: (
        databaseName: string,
        user: string,
        password: string,
      ) => Promise<QCallbackMessage>,
      closeConnection: () => Promise<void>,
      query: <Operation extends QOperation>(requests: QRequest<Operation>[])
        => Promise<QCallbackMessage>,
    }
  }
}