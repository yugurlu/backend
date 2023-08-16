import { Body, Controller, Delete, Patch, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dtos/auth.dto';
import { VerifyDto } from './dtos/verify.dto';
import { AskVerifyDto } from './dtos/ask-verify.dto';
import { ChangePasswordDto } from './dtos/change-password.dto';
import { Request, Response } from 'express';
import { CookieAuthGuard } from './cookie-auth.guard';


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("register")
    register(@Body() authDto: AuthDto) {
        return this.authService.register(authDto)
    }

    @Post("login")
    login(@Body() authDto: AuthDto, @Res() res: Response) {
        return this.authService.login(authDto, res)
    }

    @UseGuards(CookieAuthGuard)
    @Patch("verify")
    verify(@Body() verifyDto: VerifyDto) {
        return this.authService.verify(verifyDto)
    }

    @UseGuards(CookieAuthGuard)
    @Post("sendtoken")
    sendToken(@Body() askVerifyDto: AskVerifyDto) {
        return this.authService.sendToken(askVerifyDto)
    }

    @UseGuards(CookieAuthGuard)
    @Put("change-password")
    changePassword(@Req() req: Request, @Body() changePasswordDto: ChangePasswordDto) {
        return this.authService.changePassword(req, changePasswordDto)
    }

    @UseGuards(CookieAuthGuard)
    @Delete("logout")
    logout(@Res() res: Response) {
        return this.authService.logout(res)
    }
}
