import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type FormReplyDocument = HydratedDocument<FormReply>;

@Schema({ collection: 'form_replies' })
export class FormReply {
  @Prop({ type: MongooseSchema.Types.ObjectId })
  formId: MongooseSchema.Types.ObjectId;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  replierId: MongooseSchema.Types.ObjectId;

  @Prop({ type: Object, required: true })
  answers: object;
}

export const FormReplySchema = SchemaFactory.createForClass(FormReply);
