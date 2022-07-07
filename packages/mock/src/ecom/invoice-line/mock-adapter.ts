/* eslint-disable @typescript-eslint/no-unused-vars */
import type { IContext } from '@sabl/context';
import type { InvoiceLine, InvoiceLineAdapterBase } from '@appex/defs';
import type { MockRepo } from '$/mock-repo';

import { stream } from '@sabl/record';
import { AdapterBase, InvoiceLineAdapter } from '@appex/model';

import { examples } from '$/examples';

class MockInvoiceLineAdapterBase
  extends AdapterBase<MockRepo>
  implements InvoiceLineAdapterBase
{
  constructor(root: MockRepo) {
    super(root);
  }

  create(
    ctx: IContext,
    invoiceId: number,
    product: string,
    quantity: number,
    price: number
  ): Promise<InvoiceLine> {
    return Promise.resolve(
      examples.ecom
        .invoiceLine()
        .with({ invoiceId, product, quantity, price })
        .mock()
    );
  }
  get(ctx: IContext, id: number): Promise<InvoiceLine | null> {
    return Promise.resolve(examples.ecom.invoiceLine().with({ id }).mock());
  }

  getAll(ctx: IContext, invoiceId: number): AsyncIterable<InvoiceLine> {
    return stream(
      examples.ecom.invoiceLine().with({ invoiceId }).mock(),
      examples.ecom.invoiceLine().with({ invoiceId }).mock()
    );
  }

  save(ctx: IContext, record: InvoiceLine): Promise<InvoiceLine> {
    return Promise.resolve(record);
  }

  delete(ctx: IContext, id: number): Promise<void> {
    return Promise.resolve();
  }
}

export const MockInvoiceLineAdapter = InvoiceLineAdapter.extend(
  MockInvoiceLineAdapterBase
);
