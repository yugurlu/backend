import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';

@Controller('auth')
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @Post("register")
    register(@Body() dto: AuthDto) {
        return this.AuthService.register(dto)
    }

    @Post("login")
    login() {}
}
