import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, InputType, Field, Args, ResolveField, Parent } from '@nestjs/graphql';
import { JwtAuthGuard } from 'src/auth/guards/local-auth.guard';
import { NotificationsService } from './notifications.service';
import { InviteUserToReplyNotification as GqlInviteUserToReplyNotification } from 'src/graphql';
import { FormsService } from 'src/forms/forms.service';
import { Types } from 'mongoose';

@Resolver('InviteUserToReplyNotification')
export class NotificationsResolver {
  constructor(private notificationsService: NotificationsService, private formsService: FormsService) {}

  @Query()
  @UseGuards(JwtAuthGuard)
  async notifications() {
    const notifications = await this.notificationsService.getNotifications();

    return notifications;
  }

  @ResolveField()
  async form(@Parent() parent: { formId: Types.ObjectId }) {
    const form = await this.formsService.getFormById(parent.formId);

    return form;
  }
}
