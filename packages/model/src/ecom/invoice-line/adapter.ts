import type { IContext } from '@sabl/context';
import type { Constructor } from '@sabl/record';
import type { InvoiceLine } from './record';
import type { Invoice } from '$/ecom/invoice';

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

type IInvoiceLineAdapter = InvoiceLineAdapter;

export class InvoiceLineAdapter {
  static extend<TBase extends Constructor<InvoiceLineAdapterBase>>(
    Base: TBase
  ) {
    return class InvoiceLineAdapter
      extends Base
      implements IInvoiceLineAdapter
    {
      create(
        ctx: IContext,
        invoiceId: number,
        product: string,
        quantity: number,
        price: number
      ): Promise<InvoiceLine>;
      create(
        ctx: IContext,
        invoice: Invoice,
        product: string,
        quantity: number,
        price: number
      ): Promise<InvoiceLine>;
      async create(
        ctx: IContext,
        invoiceSrc: number | Invoice,
        product: string,
        quantity: number,
        price: number
      ): Promise<InvoiceLine> {
        if (typeof invoiceSrc === 'number') {
          return super.create(ctx, invoiceSrc, product, quantity, price);
        }

        const invoice = invoiceSrc;

        // Create the record
        const record = await super.create(
          ctx,
          invoice.id,
          product,
          quantity,
          price
        );

        // Set the reciprocal relations
        invoice.init.lines.appendItem(record);
        record.init.invoice.initItem(invoice);

        // Return the record
        return record;
      }

      getAll(ctx: IContext, invoiceId: number): AsyncIterable<InvoiceLine>;
      getAll(ctx: IContext, invoice: Invoice): AsyncIterable<InvoiceLine>;
      async *getAll(
        ctx: IContext,
        invoiceSrc: number | Invoice
      ): AsyncIterable<InvoiceLine> {
        if (typeof invoiceSrc === 'number') {
          return super.getAll(ctx, invoiceSrc);
        }

        const invoice = invoiceSrc;
        for await (const record of super.getAll(ctx, invoice.id)) {
          record.init.invoice.initItem(invoice);
          yield record;
        }
      }

      delete(ctx: IContext, id: number): Promise<void>;
      delete(ctx: IContext, record: InvoiceLine): Promise<void>;
      async delete(ctx: IContext, src: number | InvoiceLine): Promise<void> {
        if (typeof src === 'number') return super.delete(ctx, src);
        await super.delete(ctx, src.id);
        const invoice = src.init.invoice.item;
        if (invoice != null) {
          invoice.init.lines.removeItem(src);
        }
      }
    };
  }
}
