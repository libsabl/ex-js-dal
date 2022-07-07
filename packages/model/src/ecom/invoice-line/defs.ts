import type { Relation } from '@sabl/record';
import type { IContext } from '@sabl/context';
import type { Invoice } from '$/ecom/invoice';

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
