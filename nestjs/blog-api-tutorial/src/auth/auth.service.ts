import { Model } from 'mongoose'
import { Injectable, UnauthorizedException } from '@nestjs/common';
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

    async register(dto: AuthDto) {
        const hashedPass = await bcrypt.hash(dto.password, 10)
        const newUser = new this.userModel({
            email: dto.email,
            password: hashedPass
        })
        const user = await newUser.save()
        return this.createToken(user.email)
    }

    async login(dto: AuthDto) {
        const user =  await this.userModel.findOne({ email: dto.email })
        if (!user)
            throw new UnauthorizedException("Wrong Email")
        const isMatch = await bcrypt.compare(dto.password, user.password)
        if (!isMatch)
            throw new UnauthorizedException("Wrong Password")
        return this.createToken(user.email)
    }

    async createToken(email: string) {
        return this.jwtService.sign({ email })
    }
}
