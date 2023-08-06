import { Module } from '@nestjs/common';
import { BlogsController } from './blogs.controller';
import { BlogsService } from './blogs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Blog, BlogSchema } from './schemas/blog.schema';
import { User, UserSchema } from 'src/auth/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }]),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  controllers: [BlogsController],
  providers: [BlogsService]
})
export class BlogsModule {}
