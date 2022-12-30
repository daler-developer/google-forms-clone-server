import { Resolver, Query, Mutation, InputType, Field, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Model, Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { InviteUsersToReplyFormInput } from 'src/graphql';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/local-auth.guard';
import { InvitesService } from './invites.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { User as GqlUser } from 'src/users/schemas/user.schema';

@Resolver()
export class InvitesResolver {
  constructor(private invitesService: InvitesService, private notificationsService: NotificationsService) {}

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async inviteUsersToReplyForm(@Args('input') input: InviteUsersToReplyFormInput, @CurrentUser() currentUser: GqlUser) {
    await this.invitesService.inviteUsersToReplyForm({
      formId: new Types.ObjectId(input.formId),
      userIds: input.userIds.map((_id) => new Types.ObjectId(_id)),
    });

    return true;
  }
}
