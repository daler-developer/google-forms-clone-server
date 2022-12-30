import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, Profile } from 'passport-github';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class GitHubStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      clientID: 'cb3cfd1b84fafe5edd71',
      clientSecret: 'd102815cedb2ed2833bdc84189409f397025f96c',
      callbackURL: 'http://localhost:4000/api/auth/github/callback',
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    const existingUser = await this.usersService.getUserByGitHubId(profile.id);

    if (existingUser) {
      return existingUser;
    }

    const user = await this.usersService.createUser({
      username: profile.username,
      githubId: profile.id,
    });

    return user;
  }
}
