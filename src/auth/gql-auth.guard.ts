import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ExecutionContextHost } from '@nestjs/core/helpers/execution-context-host';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { AuthenticationError } from 'apollo-server-express';
import { Observable } from 'rxjs';

@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
