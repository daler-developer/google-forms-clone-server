import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async getUserByUsername(username: string) {
    const [user] = await this.userModel.aggregate([
      {
        $match: {
          username,
        },
      },
    ]);

    return user;
  }

  async getFormInvitedUsersToReply({ formId }: { formId: Types.ObjectId }) {
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'forms-users-invites',
          as: 'invitedFormsToReply',
          localField: '_id',
          foreignField: 'userId',
          pipeline: [
            {
              $match: {
                formId: new Types.ObjectId(formId),
              },
            },
          ],
        },
      },
      {
        $match: {
          allowedFormsToReply: {
            $size: 1,
          },
        },
      },
    ]);

    return users;
  }

  async getFormRepliers({ formId }: { formId: Types.ObjectId }) {
    const users = await this.userModel.aggregate([
      {
        $lookup: {
          from: 'form_replies',
          as: 'formReplies',
          localField: '_id',
          foreignField: 'replierId',
          // pipeline: [
          //   {
          //     $match: {
          //       replierId: '$$userId',
          //       formId,
          //     },
          //   },
          // ],
        },
      },
      // {
      //   $match: {
      //     form_replies: { $size: 1 },
      //   },
      // },
    ]);

    console.log((users[0] as any).formReplies);

    return users;
  }

  async getUserById(_id: Types.ObjectId) {
    return await this.userModel.findOne({ _id });
  }

  async getUserByGitHubId(githubId: string) {
    return await this.userModel.findOne({ githubId });
  }

  async userWithGitHubIdExists(githubId: string) {
    const exists = Boolean(await this.userModel.exists({ githubId }));

    return exists;
  }

  async createUser({ username, githubId }: { username: string; githubId: string }) {
    await this.userModel.create({
      username,
      githubId,
    });
  }
}
