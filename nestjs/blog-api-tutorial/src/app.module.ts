import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './blogs/blogs.module';

@Module({
  imports: [AuthModule, MongooseModule.forRoot("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3"), BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
