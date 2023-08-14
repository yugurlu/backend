
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string
}