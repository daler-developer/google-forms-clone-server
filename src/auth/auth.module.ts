import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersModule } from 'src/users/users.module';
import { AuthResolver } from './auth.resolver';
import { GitHubStrategy } from './strategies/github.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';

@Module({
  imports: [
    PassportModule,
    UsersModule,
    JwtModule.register({
      secret: 'jwt_secret',
    }),
  ],
  controllers: [AuthController],
  providers: [GitHubStrategy, JwtStrategy, AuthResolver, AuthService],
  exports: [AuthService],
})
export class AuthModule {}
