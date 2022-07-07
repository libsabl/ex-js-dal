import { Context, IContext } from '@sabl/context';
import { faker } from '@faker-js/faker';
import { getRepo } from '@appex/defs';
import { Invoice, InvoiceLine, InvoiceLineProps } from '@appex/model';

export class InvoiceLineExamples implements InvoiceLineProps {
  id: number = faker.datatype.number();
  invoiceId: number = faker.datatype.number();
  product: string = faker.commerce.productDescription();

  #price: number = +faker.commerce.price();
  #quantity: number = faker.datatype.number({ min: 1, max: 20, precision: 1 });
  #amount: number = this.#price * this.#quantity;

  get price(): number {
    return this.#price;
  }
  set price(value: number) {
    this.#price = value;
    this.#amount = this.#price * this.#quantity;
  }

  get quantity(): number {
    return this.#quantity;
  }
  set quantity(value: number) {
    this.#quantity = value;
    this.#amount = this.#price * this.#quantity;
  }

  get amount(): number {
    return this.#amount;
  }

  #invoice: Invoice | null = null;
  /** Related invoice record. Null by default */
  get invoice(): Invoice | null {
    return this.#invoice;
  }
  set invoice(value: Invoice | null) {
    this.#invoice = value;
    if (value != null) {
      this.invoiceId = value.id;
    }
  }

  /** Return a new examples with any provided properties updated  */
  with(data: {
    id?: number;
    invoiceId?: number;
    quantity?: number;
    price?: number;
    product?: string;
    invoice?: Invoice;
  }) {
    return Object.assign(new InvoiceLineExamples(), this, data);
  }

  /** Create a mock record based on example data */
  mock() {
    const model = new InvoiceLine();
    model.init.load(this);
    return model;
  }

  /** Create (insert) an actual record based on example data */
  create(ctx: IContext) {
    const repo = Context.as(ctx).require(getRepo);
    if (this.#invoice != null) {
      return repo.ecom.invoiceLine.create(
        ctx,
        this.#invoice,
        this.product,
        this.#quantity,
        this.#price
      );
    } else {
      return repo.ecom.invoiceLine.create(
        ctx,
        this.#invoice || this.invoiceId,
        this.product,
        this.#quantity,
        this.#price
      );
    }
  }
}
