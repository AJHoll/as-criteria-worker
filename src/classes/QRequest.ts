import { QOperation } from '../interfaces/QOperation';
import { QCallbackMessage } from '../interfaces/QCallbackMessage';
import { v4 as uuid } from 'uuid';
import QFilter from './QFilter';

export default class QRequest<Operation extends QOperation> {
  name: string;

  operation: Operation;

  useTransaction: boolean;

  bindingParams: { [key in keyof Operation['bindingParams']]: any };

  private _preMethod?: (request: QRequest<Operation>) => void;

  get preMethod(): ((request: QRequest<Operation>) => void) | undefined {
    return this._preMethod;
  }

  private _postMethod?: (request: QRequest<Operation>, payload: QCallbackMessage) => QCallbackMessage;

  get postMethod(): ((request: QRequest<Operation>, payload: QCallbackMessage) => QCallbackMessage) | undefined {
    return this._postMethod;
  }

  constructor(
    operation: Operation,
    useTransaction?: boolean,
    bindingParams?: { [key in keyof Operation['bindingParams']]: any },
  ) {
    this.name = uuid();
    this.operation = structuredClone(operation);
    this.bindingParams = structuredClone(operation.bindingParams);
    if (bindingParams) {
      this.bindingParams = { ...this.bindingParams, ...bindingParams };
    }
    this.useTransaction = useTransaction ?? false;
  }

  usePreMethod(preMethod: (request: QRequest<Operation>) => void): QRequest<Operation> {
    this._preMethod = (request) => preMethod(request);
    return this;
  }

  usePostMethod(postMethod: (request: QRequest<Operation>,
                             payload: QCallbackMessage) => QCallbackMessage): QRequest<Operation> {
    this._postMethod = postMethod;
    return this;
  }

  useFilter(...filter: QFilter[]) {
    if (!filter || filter.length === 0) {
      return this;
    }
    filter.forEach((flt) => {
      if (flt.bindingParams[flt.name] !== undefined) {
        this.operation.query = this.operation.query.replaceAll(
          `/*filter:${flt.name}*/`,
          flt.query,
        );

        this.bindingParams = { ...this.bindingParams, ...flt.bindingParams };
      }
    });
    return this;
  }
}
