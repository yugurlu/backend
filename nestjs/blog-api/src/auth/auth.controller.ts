import { Body, Controller, Patch, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { VerifyDto } from './dtos/verify.dto';
import { AskVerifyDto } from './dtos/ask-verify.dto';

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("register")
    register(@Body() authDto: AuthDto) {
        return this.authService.register(authDto)
    }

    @Post("login")
    login(@Body() authDto: AuthDto) {
        return this.authService.login(authDto)
    }

    @Patch("verify")
    verify(@Body() verifyDto: VerifyDto) {
        return this.authService.verify(verifyDto)
    }

    @Post("sendtoken")
    sendToken(@Body() askVerifyDto: AskVerifyDto) {
        return this.authService.sendToken(askVerifyDto)
    }
}
