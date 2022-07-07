import type { CollectionRelation } from '@sabl/record';
import type { IContext } from '@sabl/context';
import type { Invoice } from './record';
import type { InvoiceLine } from '$/ecom/invoice-line';

/** The properties of the Invoice record */
export interface InvoiceProps {
  readonly id: number;
  readonly invoiceNumber: number;
}

/** The relations of the Invoice record */
export interface InvoiceRels {
  getLines(ctx: IContext): Promise<InvoiceLine[]>;
}

export interface InvoiceInitter {
  load(data: InvoiceProps, refresh: boolean): void;
  readonly lines: CollectionRelation<Invoice, InvoiceLine>;
}
