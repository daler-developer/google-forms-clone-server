import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import {} from 'src/graphql';
import { FormsUsersInvites, FormsUsersInvitesDocument } from './schemas/forms-users-invites.schema';

@Injectable()
export class InvitesService {
  constructor(
    @InjectModel(FormsUsersInvites.name)
    private formsUsersInvitesModel: Model<FormsUsersInvitesDocument>,
  ) {}

  async inviteUsersToReplyForm({ formId, userIds }: { userIds: Types.ObjectId[]; formId: Types.ObjectId }) {
    userIds.forEach(async (_id) => {
      await this.formsUsersInvitesModel.create({
        formId,
        userId: _id,
      });
    });
  }

  async createInvite({ formId, userId }: { formId: Types.ObjectId; userId: Types.ObjectId }) {}
}
