import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, userDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<userDocument>,
    private jwtService: JwtService) {}

    async register(user: AuthDto) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        const newUser = new this.userModel({
            email: user.email,
            password: hashedPassword
        })
        const userSave = await newUser.save()
        return this.createToken(user.email)
    }

    async createToken(email: string) {
        return  this.jwtService.sign({ email })
    }
}
