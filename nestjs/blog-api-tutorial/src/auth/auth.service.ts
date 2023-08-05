import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async resgister(dto: AuthDto) {
        const hashedPass = await bcrypt.hash(dto.password, 10)
        const newUser = new this.userModel({
            email: dto.email,
            password: hashedPass
        })
        return await newUser.save()
    }
}
