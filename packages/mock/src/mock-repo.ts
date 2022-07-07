import { EComAdapters } from '@appex/defs';
import { RepositoryBase } from '@appex/model';
import { MockEComAdapters } from './ecom/mock-adapters';

export class MockRepo extends RepositoryBase<MockRepo> {
  protected get self(): MockRepo {
    return this;
  }
  protected buildECom(root: MockRepo): EComAdapters {
    return new MockEComAdapters(root);
  }
}
