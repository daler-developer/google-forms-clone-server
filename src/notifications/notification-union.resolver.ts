import { ResolveField, Resolver } from '@nestjs/graphql';
import {} from 'src/graphql';

@Resolver('NotificationUnion')
export class NotificationUnionResolver {
  @ResolveField()
  __resolveType(value) {
    if (value.type === 'invite-user-to-reply') {
      return 'InviteUserToReplyNotification';
    }
    return null;
  }
}
