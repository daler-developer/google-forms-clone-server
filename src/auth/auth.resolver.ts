import { Resolver, Query, Mutation, InputType, Field, Args } from '@nestjs/graphql';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UseGuards } from '@nestjs/common';
import { User as GqlUser } from 'src/graphql';
import { GitHubAuthGuard } from './guards/github-auth.guard';
import { JwtAuthGuard } from './guards/local-auth.guard';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';

@Resolver()
export class AuthResolver {
  constructor() {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async me(@CurrentUser() user: GqlUser) {
    return user;
  }
}
