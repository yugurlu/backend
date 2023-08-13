import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { GoogleAuthGuard } from "./guards/google-auth.guard";


@Controller("auth")
export class AuthController {
    constructor() {}

    @Get("google")
    @UseGuards(GoogleAuthGuard)
    async googleAuth() {}

    @Get("google/callback")
    @UseGuards(GoogleAuthGuard)
    async googleLoginCallback(@Req() req) {
        return req.user
    }
}