import type { Invoice, InvoiceLine } from '@appex/defs';

import {
  collect,
  CollectionRelation,
  NullableRelation,
  Relation,
} from '@sabl/record';
import { Context, IContext } from '@sabl/context';
import { getRepo } from '@appex/defs';

function getInvoice(ctx: IContext, key: number): Promise<Invoice | null> {
  const repo = Context.as(ctx).require(getRepo);
  return repo.ecom.invoice.get(ctx, key);
}

function getInvoiceLines(
  ctx: IContext,
  parent: Invoice
): Promise<Iterable<InvoiceLine>> {
  const repo = Context.as(ctx).require(getRepo);
  return collect(repo.ecom.invoiceLine.getAll(ctx, parent));
}

/** A relation of an invoice to its lines */
export class Invoice_LinesRelation extends CollectionRelation<
  Invoice,
  InvoiceLine
> {
  constructor() {
    super(getInvoiceLines);
  }
}

/** A relation to an invoice record */
export class Invoice_Relation extends Relation<number, Invoice> {
  constructor(keyProp: string) {
    super(keyProp, getInvoice);
  }
}

/** A nullable relation to an invoice record */
export class Invoice_NullableRelation extends NullableRelation<
  number,
  Invoice
> {
  constructor(keyProp: string) {
    super(keyProp, getInvoice);
  }
}
