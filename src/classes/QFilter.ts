export default class QFilter {
  name: string;

  query: string;

  bindingParams: any;

  constructor(filter?: QFilter, bindingParams?: Object) {
    this.name = filter?.name || '';
    this.query = filter?.query || '';
    this.bindingParams = bindingParams || {};
  }
}
