import { Request } from 'express';
import { PubSub } from 'graphql-subscriptions';

export interface IGqlContext {
  pubSub: PubSub;
}
