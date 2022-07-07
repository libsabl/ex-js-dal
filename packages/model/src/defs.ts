import { EComAdapters } from './ecom/defs';

/** The root model adapter interface for the example application */
export interface Repository {
  get ecom(): EComAdapters;
}

export type { EComAdapters };
