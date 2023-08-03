
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from './user.services';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from "./schemas/users.schemas";


@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
    controllers: [UsersController],
    providers: [UsersService]
})
export class  UsersModule {}