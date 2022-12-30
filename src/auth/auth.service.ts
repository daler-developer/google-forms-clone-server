import { Inject, Injectable, Scope, UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { CONTEXT, GqlExecutionContext, Context } from '@nestjs/graphql';
import { Request } from 'express';

@Injectable({ scope: Scope.REQUEST })
export class AuthService {
  constructor(@Inject(CONTEXT) private context) {}

  get currentUser() {
    return this.context.req.user;
  }

  ensureIsAuthenticated() {
    if (!this.context.req.user) {
      throw new UnauthorizedException();
    }
  }
}
