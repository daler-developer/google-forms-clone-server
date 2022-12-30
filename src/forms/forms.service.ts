import { Injectable } from '@nestjs/common';
import { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Form } from './schemas/form.schema';
import { CreateFormInput, Form as GqlForm, CreateFormReplyInput, User as GqlUser } from 'src/graphql';
import { FormDocument } from './schemas/form.schema';
import { FormReply, FormReplyDocument } from './schemas/form-reply.schema';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private formModel: Model<FormDocument>,
    @InjectModel(FormReply.name)
    private formReplyModel: Model<FormReplyDocument>,
    private authService: AuthService,
  ) {}

  async getFormReplyById(_id: Types.ObjectId) {
    const formReply = await this.formReplyModel.findOne({ _id });

    return formReply;
  }

  async createFormReply({
    answers,
    formId,
    replierId,
  }: Omit<CreateFormReplyInput, 'formId'> & {
    formId: Types.ObjectId;
    replierId: Types.ObjectId;
  }) {
    const { _id } = await this.formReplyModel.create({
      formId,
      answers,
      replierId,
    });

    return await this.getFormReplyById(_id);
  }

  async getFormById(_id: Types.ObjectId) {
    this.authService.ensureIsAuthenticated();

    const [form] = await this.formModel.aggregate([
      {
        $lookup: {
          from: 'forms-users-invites',
          as: 'allowedUsersToReply',
          localField: '_id',
          foreignField: 'formId',
          pipeline: [
            {
              $match: {
                userId: this.authService.currentUser._id,
              },
            },
          ],
        },
      },
      {
        $addFields: {
          isAllowedToReply: {
            $cond: {
              if: {
                $size: '$allowedUsersToReply',
              },
              then: true,
              else: false,
            },
          },
        },
      },
      {
        $match: {
          _id,
        },
      },
    ]);

    return form;
  }

  async changeFormAcceptsRepliesStatus({ to, formId }: { to: boolean; formId: Types.ObjectId }) {
    await this.formModel.updateOne({
      _id: formId,
      acceptsReplies: to,
    });
  }

  async incrementFormNumReplies({ formId }: { formId: Types.ObjectId }) {
    await this.formModel.updateOne({ _id: formId }, { $inc: { numReplies: 1 } });
  }

  async decrementFormNumReplies({ formId }: { formId: Types.ObjectId }) {
    await this.formModel.updateOne({ _id: formId }, { $inc: { numReplies: -1 } });
  }

  async createForm({
    name,
    desc,
    questions,
    creatorId,
  }: {
    name: CreateFormInput['name'];
    desc: CreateFormInput['desc'];
    questions: CreateFormInput['questions'];
    isPrivate: CreateFormInput['isPrivate'];
    creatorId: Types.ObjectId;
  }) {
    const { _id } = await this.formModel.create({
      name,
      desc,
      questions,
      creatorId,
    });

    return await this.getFormById(_id);
  }
}
