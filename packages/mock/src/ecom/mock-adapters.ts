import type { InvoiceAdapter, InvoiceLineAdapter } from '@appex/defs';
import type { MockRepo } from '$/mock-repo';

import { EComAdaptersBase } from '@appex/model';
import { MockInvoiceAdapter } from './invoice/mock-adapter';
import { MockInvoiceLineAdapter } from './invoice-line/mock-adapter';

export class MockEComAdapters extends EComAdaptersBase<MockRepo> {
  constructor(root: MockRepo) {
    super(root);
  }

  protected buildInvoice(root: MockRepo): InvoiceAdapter {
    return new MockInvoiceAdapter(root);
  }

  protected buildInvoiceLine(root: MockRepo): InvoiceLineAdapter {
    return new MockInvoiceLineAdapter(root);
  }
}
