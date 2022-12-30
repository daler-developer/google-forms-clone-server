import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { InvitesResolver } from './invites.resolver';
import { InvitesService } from './invites.service';
import { FormsUsersInvites, FormsUsersInvitesSchema } from './schemas/forms-users-invites.schema';

@Module({
  imports: [
    NotificationsModule,
    MongooseModule.forFeature([
      {
        name: FormsUsersInvites.name,
        schema: FormsUsersInvitesSchema,
      },
    ]),
  ],
  providers: [InvitesService, InvitesResolver],
  exports: [InvitesService],
})
export class InvitesModule {}
