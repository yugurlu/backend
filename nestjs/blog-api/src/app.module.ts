import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogsModule } from './blogs/blogs.module';
import { ConfigModule } from '@nestjs/config';
import { CookieAuthGuard } from './auth/cookie-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { ExtractUserMiddleware } from './shared/middlewares/extract-user.middleware';

@Module({
  imports: [AuthModule,BlogsModule, ConfigModule.forRoot(), MongooseModule.forRoot("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.10.3")],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: APP_GUARD,
      useClass: CookieAuthGuard,
    },
  ],
})

export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ExtractUserMiddleware).forRoutes('*');
  }
}
