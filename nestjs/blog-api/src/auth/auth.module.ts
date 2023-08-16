import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategy/jwt.strategy';
import { EmailVerificationService } from './email-verification/email-verification.service';
import { CookieAuthGuard } from './cookie-auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{name: User.name, schema: UserSchema}]),
    JwtModule.register({
      secret: "cat",
      signOptions: { expiresIn: "20m" } // jwt register
    })
  ],
  controllers: [AuthController],
  providers: [AuthService, CookieAuthGuard, EmailVerificationService, JwtStrategy]
})
export class AuthModule {}
