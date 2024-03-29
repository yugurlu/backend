import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './auth/strategy/jwt.strategy';


@Module({
  imports: [AuthModule, MongooseModule.forRoot("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3")],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
