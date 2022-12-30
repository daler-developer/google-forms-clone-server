import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { GitHubAuthGuard } from './guards/github-auth.guard';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { User as GqlUser } from 'src/graphql';

declare module 'express' {
  interface Request {
    user?: GqlUser;
  }
}

@Controller('/api')
export class AuthController {
  constructor(private jwtService: JwtService) {}

  @Get('/auth/github/callback')
  @UseGuards(GitHubAuthGuard)
  async githubCallback(@Req() req: Request) {
    const accessToken = this.jwtService.sign({ userId: req.user._id });

    return {
      user: req.user,
      accessToken,
    };
  }
}
