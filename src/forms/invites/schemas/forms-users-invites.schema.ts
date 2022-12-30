import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type FormsUsersInvitesDocument = HydratedDocument<FormsUsersInvites>;

@Schema({ collection: 'forms-users-invites' })
export class FormsUsersInvites {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  userId: Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  formId: Types.ObjectId;
}

export const FormsUsersInvitesSchema = SchemaFactory.createForClass(FormsUsersInvites);
