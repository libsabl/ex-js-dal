import { IContext, Context, withValue, Maybe } from '@sabl/context';
import { Repository } from './repository';

const ctxKeyRepo = Symbol('repo');

export function withRepo(ctx: IContext, repo: Repository): Context {
  return withValue(ctx, ctxKeyRepo, repo);
}

export function getRepo(ctx: IContext): Maybe<Repository> {
  return <Maybe<Repository>>ctx.value(ctxKeyRepo);
}
