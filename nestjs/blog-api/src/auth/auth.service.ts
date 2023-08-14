import { Model, now } from 'mongoose'
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schemas/user.schema';
import { AuthDto } from './dtos/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { EmailVerificationService } from './email-verification/email-verification.service';
import { VerifyDto } from './dtos/verify.dto';
import { AskVerifyDto } from './dtos/ask-verify.dto';

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
        private jwtService: JwtService,
        private emailVerificationService: EmailVerificationService,
    ) {}

    async register(authDto: AuthDto) {
        const userSearch = await this.userModel.findOne({ email: authDto.email })
        if (!userSearch) {
            const hashedPass = await bcrypt.hash(authDto.password, 10)
            const newUser = new this.userModel({
                email: authDto.email,
                password: hashedPass,
            })
            const user = await newUser.save()
            return this.createToken(user.email)
        }
        else
            throw new UnauthorizedException("User Already Registered")
    }

    async login(authDto: AuthDto) {
        const user =  await this.userModel.findOne({ email: authDto.email })
        if (!user)
            throw new UnauthorizedException("Wrong Email")
        const isMatch = await bcrypt.compare(authDto.password, user.password)
        if (!isMatch)
            throw new UnauthorizedException("Wrong Password")
        return this.createToken(user.email)
    }

    async createToken(email: string) {
        return this.jwtService.sign({ email })
    }

    async verify(verifyDto: VerifyDto) {
        const user = await this.userModel.findOne({ email: verifyDto.email })
        const now = new Date
        if (!user)
            throw new UnauthorizedException("User not found")
        if (user.emailVerification.isVerified)
            throw new UnauthorizedException("User already verified")
        if (user.emailVerification.token != verifyDto.token)
            throw new UnauthorizedException("Invaild token")
        if (user.emailVerification.verifiyCodeExpiresAt < now)
          throw new UnauthorizedException("Token is expired")
        else
            return await this.userModel.findByIdAndUpdate(user.id, { 'emailVerification.isVerified': true }, { new: true })
    }

    async sendToken(askVerifyDto: AskVerifyDto) {
        const user = await this.userModel.findOne({ email: askVerifyDto.email })
        if (!user)
            throw new UnauthorizedException("User not found")
        if (user.emailVerification.isVerified)
            throw new UnauthorizedException("User already verified")
        else {
            user.emailVerification.verifiyCodeExpiresAt = new Date
            user.emailVerification.verifiyCodeExpiresAt.setMinutes(user.emailVerification.verifiyCodeExpiresAt.getMinutes() + 10)
            user.emailVerification.token = this.emailVerificationService.generateVerificationToken()

            await this.userModel.findByIdAndUpdate(user.id, user)
            return await this.emailVerificationService.sendVerificationEmail(askVerifyDto.email, user.emailVerification.token)
        }
    }
}
