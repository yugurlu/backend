import { Body, Controller, Param, Patch, Post, Put, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { VerifyDto } from './dtos/verify.dto';
import { AskVerifyDto } from './dtos/ask-verify.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { AuthGuard } from '@nestjs/passport';


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

    @UseGuards(AuthGuard("jwt"))
    @Patch("verify")
    verify(@Body() verifyDto: VerifyDto) {
        return this.authService.verify(verifyDto)
    }

    @UseGuards(AuthGuard("jwt"))
    @Post("sendtoken")
    sendToken(@Body() askVerifyDto: AskVerifyDto) {
        return this.authService.sendToken(askVerifyDto)
    }

    @UseGuards(AuthGuard("jwt"))
    @Put("change-password/:id")
    changePassword(@Param("id") id: string, @Request() req: any, @Body() changePasswordDto: ChangePasswordDto) {
        return this.authService.changePassword(id, req, changePasswordDto)
    }
}
