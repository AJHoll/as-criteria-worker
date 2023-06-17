import { Client } from 'pg';
import { ConfigDatabase } from '../../interfaces/Config';
import QRequest from '../../classes/QRequest';
import { QOperation } from '../../interfaces/QOperation';
import { QCallbackMessage } from '../../interfaces/QCallbackMessage';
import { QCallbackMessageStatus } from '../../interfaces/QCallbackMessageStatus';

export class DatabaseController {
  client: Client | null = null;

  async openConnection(
    dbConfig: ConfigDatabase,
    user: string,
    password: string,
  ): Promise<QCallbackMessage> {
    const { host, port, database } = dbConfig;
    if (this.client) {
      try {
        await this.client.end();
      } catch (_ignore) {
        // eslint-disable-next-line no-console
        console.error(_ignore);
      }
      this.client = null;
    }
    this.client = new Client({ host, port, database, user, password });
    try {
      await this.client.connect();
      return {
        status: QCallbackMessageStatus.Done,
        data: {},
      };
    } catch (err: unknown) {
      console.error(err);
      return {
        status: QCallbackMessageStatus.ConnectionError,
        error: `Ошибка при подключении к БД ${dbConfig.name}: ${(err as Error).message}`,
      };
    }
  }

  async closeConnection(): Promise<void> {
    if (this.client) {
      try {
        await this.client.end();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error((err as Error).message);
      } finally {
        this.client = null;
      }
    }
  }

  private static chainingQuery(bindingParams: any, prevPayload: any) {
    const regexp = /\$\((.*)\)/;
    const bindings = bindingParams;
    const parentPayload = prevPayload;
    for (const key in bindings) {
      if (bindings[key]) {
        if (bindings[key].toString().match(regexp)) {
          const synKey = bindings[key].toString().match(regexp)[1];
          bindings[key] = [];
          if (parentPayload.length > 1) {
            for (const data of parentPayload) {
              bindings[key] = [...bindings[key], data[synKey]];
            }
          } else {
            bindings[key] = parentPayload[0][synKey];
          }
        }
      }
    }
    return bindings;
  }

  private static transpileQuery(query: string, bindingParams: { [key: string]: any }) {
    const regexp = /\$\((\w*)\)/gim;
    const queryBindKeys = query.match(regexp);
    const bindingKeys = Object.keys(bindingParams);
    const transParams: any[] = [];
    let transQuery: string = query;
    if (queryBindKeys) {
      // пробегаемся по запросу с ключами
      let isNeedPush: boolean = false;
      for (const key of bindingKeys) {
        for (const queryKey of queryBindKeys) {
          if (queryKey === `$(${key})`) {
            transQuery = transQuery.replaceAll(queryKey, `$${transParams.length + 1}`);
            isNeedPush = true;
          }
        }
        if (isNeedPush) {
          transParams.push(bindingParams[key]);
          isNeedPush = false;
        }
      }
    }
    return { query: transQuery, bindingParams: transParams };
  }

  async query<Operation extends QOperation>(requests: QRequest<Operation>[]): Promise<QCallbackMessage> {
    if (this.client) {
      try {
        let data: unknown[] = [];
        if (requests[0].useTransaction) {
          try {
            await this.client.query('BEGIN');
            for (const request of requests) {
              request.bindingParams = DatabaseController.chainingQuery(request.bindingParams, data);
              const transQuery = DatabaseController.transpileQuery(request.operation.query, request.bindingParams);
              const unitData = await this.client.query(transQuery.query, transQuery.bindingParams);
              data = [...data, ...unitData.rows];
            }
            await this.client.query('COMMIT');
          } catch (err) {
            try {
              await this.client.query('ROLLBACK');
            } catch (err) {
              console.error(err);
            }
            console.error(err);
            return { status: QCallbackMessageStatus.QueryError, error: (err as Error).message };
          }
        } else {
          for (const request of requests) {
            request.bindingParams = DatabaseController.chainingQuery(request.bindingParams, data);
            const transQuery = DatabaseController.transpileQuery(request.operation.query, request.bindingParams);
            const unitData = await this.client.query(transQuery.query, transQuery.bindingParams);
            data = [...data, ...unitData.rows];
          }
        }
        return { status: QCallbackMessageStatus.Done, data };
      } catch (err) {
        return { status: QCallbackMessageStatus.QueryError, error: (err as Error).message };
      }
    }
    return { status: QCallbackMessageStatus.PoolError, error: 'Не удалось получить объект соединения!' };
  }
}

const databaseController = new DatabaseController();
export default databaseController;
