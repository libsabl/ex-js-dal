import type { Repository } from './defs';
import { IContext, Context, withValue, Maybe } from '@sabl/context';

const ctxKeyRepo = Symbol('repo');

export function withRepo(ctx: IContext, repo: Repository): Context {
  return withValue(ctx, ctxKeyRepo, repo);
}

export function getRepo(ctx: IContext): Maybe<Repository> {
  return <Maybe<Repository>>ctx.value(ctxKeyRepo);
}
