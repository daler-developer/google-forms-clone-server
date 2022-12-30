import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema } from 'mongoose';

export type FormDocument = HydratedDocument<Form>;

@Schema()
export class Form {
  @Prop({ required: true })
  name: string;

  @Prop({ type: Boolean, required: true, defualt: () => false })
  isPrivate: boolean;

  @Prop({ type: Boolean, required: true, defualt: () => 0 })
  numReplies: number;

  @Prop({ type: String, required: true, defualt: () => 'blue' })
  theme: string;

  @Prop({ required: true })
  desc: string;

  @Prop({ type: MongooseSchema, required: true })
  creatorId: MongooseSchema.Types.ObjectId;

  @Prop({ type: Object, required: true })
  questions: any;

  @Prop({ type: Boolean, required: true, default: () => true })
  acceptsReplies: boolean;
}

export const FormSchema = SchemaFactory.createForClass(Form);
