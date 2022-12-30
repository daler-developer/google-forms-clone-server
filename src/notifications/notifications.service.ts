import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {} from 'src/graphql';
import { Notification, NotificationDocument } from './schema/notification.schema';

@Injectable()
export class NotificationsService {
  constructor(@InjectModel(Notification.name) private notificationModel: Model<NotificationDocument>) {}

  async createInviteUserToReplyFormNotification({
    receiverId,
    formId,
  }: {
    receiverId: Types.ObjectId;
    formId: Types.ObjectId;
  }) {
    await this.notificationModel.create({
      type: 'invite-user-to-reply',
      receiverId,
      additionalData: {
        formId,
      },
    });
  }

  async getNotifications() {
    return await this.notificationModel.aggregate([
      {
        $addFields: {
          formId: '$additionalData.formId',
        },
      },
    ]);
  }
}
