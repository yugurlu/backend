
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./schemas/users.schemas";
import { Model } from "mongoose";


@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name) private userModel : Model<UserDocument>) {}

    async findall() {
        return this.userModel.find()
    }
}