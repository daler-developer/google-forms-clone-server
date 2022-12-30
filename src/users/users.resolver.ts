import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, InputType, Field, Args, ResolveField, Parent } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/local-auth.guard';
import { UsersService } from './users.service';
import { GetUserInput } from 'src/graphql';

@Resolver()
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async user(@Args('input') input: GetUserInput) {
    const user = await this.usersService.getUserByUsername(input.username);

    return user;
  }
}
