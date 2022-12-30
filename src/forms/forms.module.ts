import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FormsResolver } from './forms.resolver';
import { FormsService } from './forms.service';
import { Form } from './schemas/form.schema';
import { FormReply, FormReplySchema } from './schemas/form-reply.schema';
import { FormSchema } from './schemas/form.schema';
import { UsersModule } from 'src/users/users.module';
import { InvitesModule } from './invites/invites.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    InvitesModule,
    UsersModule,
    AuthModule,
    MongooseModule.forFeature([
      { name: Form.name, schema: FormSchema },
      {
        name: FormReply.name,
        schema: FormReplySchema,
      },
    ]),
  ],
  controllers: [],
  providers: [FormsResolver, FormsService],
  exports: [FormsService],
})
export class FormsModule {}
