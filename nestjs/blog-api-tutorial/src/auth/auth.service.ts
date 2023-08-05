import { Model } from 'mongoose'
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { AuthDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService
    ) {}

    async resgister(dto: AuthDto) {
        const hashedPass = await bcrypt.hash(dto.password, 10)
        const newUser = new this.userModel({
            email: dto.email,
            password: hashedPass
        })
        const user = await newUser.save()
        return this.createToken(user.email)
    }

    async createToken(email: string) {
        return this.jwtService.sign({ email })
    }
}
