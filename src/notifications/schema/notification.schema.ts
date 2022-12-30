import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Schema as MongooseSchema, Types } from 'mongoose';

export type NotificationDocument = HydratedDocument<Notification>;

@Schema({ collection: 'notifications' })
export class Notification {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  receiverId: Types.ObjectId;

  @Prop({ type: String, required: true })
  type: string;

  @Prop({ type: Object, required: true })
  additionalData: any;
}

export const NotificationSchema = SchemaFactory.createForClass(Notification);
