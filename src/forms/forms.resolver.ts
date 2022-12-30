import { Resolver, Query, Mutation, InputType, Field, Args, ResolveField, Parent } from '@nestjs/graphql';
import { Model, Types } from 'mongoose';
import { UseGuards } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FormDocument } from './schemas/form.schema';
import { FormsService } from './forms.service';
import {
  CreateFormInput,
  User as GqlUser,
  CreateFormReplyInput,
  ChangeFormAcceptsRepliesStatus,
  InviteUsersToReplyFormInput,
  Form as GqlForm,
} from 'src/graphql';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { JwtAuthGuard } from 'src/auth/guards/local-auth.guard';
import { UsersService } from 'src/users/users.service';
import { InvitesService } from './invites/invites.service';

@Resolver('Form')
export class FormsResolver {
  constructor(
    private formsService: FormsService,
    private usersService: UsersService,
    private invitesService: InvitesService,
  ) {}

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async createForm(@Args('input') input: CreateFormInput, @CurrentUser() currentUser: GqlUser) {
    const form = await this.formsService.createForm({
      name: input.name,
      desc: input.desc,
      questions: input.questions,
      creatorId: new Types.ObjectId(currentUser._id),
      isPrivate: input.isPrivate,
    });

    await this.invitesService.inviteUsersToReplyForm({
      formId: (form as any)._id,
      userIds: input.invitedUsersToReply.map((_id) => new Types.ObjectId(_id)),
    });

    return form;
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async changeFormAcceptsRepliesStatus(
    @Args('input') input: ChangeFormAcceptsRepliesStatus,
    @CurrentUser() currentUser: GqlUser,
  ) {
    await this.formsService.changeFormAcceptsRepliesStatus({
      to: input.to,
      formId: new Types.ObjectId(input.formId),
    });

    return true;
  }

  @Mutation()
  @UseGuards(JwtAuthGuard)
  async createFormReply(@Args('input') input: CreateFormReplyInput, @CurrentUser() currentUser: GqlUser) {
    const formReply = await this.formsService.createFormReply({
      formId: new Types.ObjectId(input.formId),
      answers: input.answers,
      replierId: new Types.ObjectId(currentUser._id),
    });

    await this.formsService.incrementFormNumReplies({ formId: new Types.ObjectId(input.formId) });

    return formReply;
  }

  @Query()
  @UseGuards(JwtAuthGuard)
  async form(@Args('_id') _id: string, @CurrentUser() currentUser: GqlUser) {
    const form = await this.formsService.getFormById(new Types.ObjectId(_id));

    return form;
  }

  @ResolveField()
  async invitedUsersToReply(@Parent() parent: GqlForm) {
    return await this.usersService.getFormInvitedUsersToReply({
      formId: new Types.ObjectId(parent._id),
    });
  }

  @ResolveField()
  async repliers(@Parent() form: GqlForm) {
    return await this.usersService.getFormRepliers({ formId: new Types.ObjectId(form._id) });
  }
}
