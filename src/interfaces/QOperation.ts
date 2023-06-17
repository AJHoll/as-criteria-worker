import QFilter from '../classes/QFilter';

export interface QOperation {
  query: string;
  bindingParams: any;
  filters?: {
    [key: string]: QFilter;
  };
}
