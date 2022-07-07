import type { RecordOf, Relation } from '@sabl/record';
import type { IContext } from '@sabl/context';
import type { Invoice } from './invoice';

/** The properties of the InvoiceLine record */
export interface InvoiceLineProps {
  readonly id: number;
  readonly invoiceId: number;
  readonly product: string;
  readonly quantity: number;
  readonly price: number;
  readonly amount: number;
}

/** The relations of the InvoiceLine record */
export interface InvoiceLineRels {
  getInvoice(ctx: IContext): Promise<Invoice>;
}

/** The mutators for protected properties of an InvoiceLine record */
export interface InvoiceLineMutators {
  setProduct(product: string): void;
  setQuantity(quantity: number): void;
  setPrice(price: number): void;
}

/** Initter for InvoiceLine record */
export interface InvoiceLineInitter {
  load(data: InvoiceLineProps, refresh: boolean): void;
  readonly invoice: Relation<number, Invoice>;
}

/** An InvoiceLine record */
export interface InvoiceLine
  extends InvoiceLineProps,
    InvoiceLineMutators,
    InvoiceLineRels,
    RecordOf<number> {
  readonly init: InvoiceLineInitter;
}

/** Direct operations for InvoiceLine records */
export interface InvoiceLineAdapterBase {
  create(
    ctx: IContext,
    invoiceId: number,
    product: string,
    quantity: number,
    price: number
  ): Promise<InvoiceLine>;

  get(ctx: IContext, id: number): Promise<InvoiceLine | null>;
  getAll(ctx: IContext, invoiceId: number): AsyncIterable<InvoiceLine>;
  save(ctx: IContext, record: InvoiceLine): Promise<InvoiceLine>;
  delete(ctx: IContext, id: number): Promise<void>;
}

/** Extended operations for InvoiceLine records */
export interface InvoiceLineAdapter extends InvoiceLineAdapterBase {
  /** Create a new InvoiceLine from the related parent invoice id and line attributes */
  create(
    ctx: IContext,
    invoiceId: number,
    product: string,
    quantity: number,
    price: number
  ): Promise<InvoiceLine>;
  /** Create a new InvoiceLine from the related parent invoice and line attributes */
  create(
    ctx: IContext,
    invoice: Invoice,
    product: string,
    quantity: number,
    price: number
  ): Promise<InvoiceLine>;

  /** Get all InvoiceLine records for a parent Invoice id */
  getAll(ctx: IContext, invoiceId: number): AsyncIterable<InvoiceLine>;
  /** Get all InvoiceLine records for a parent Invoice */
  getAll(ctx: IContext, invoice: Invoice): AsyncIterable<InvoiceLine>;

  /** Delete an InvoiceLine record by its id */
  delete(ctx: IContext, id: number): Promise<void>;
  /** Delete an InvoiceLine records */
  delete(ctx: IContext, record: InvoiceLine): Promise<void>;
}
