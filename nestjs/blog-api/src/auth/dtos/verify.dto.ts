
import { IsNotEmpty, IsString } from 'class-validator';


export class VerifyDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsNotEmpty()
    @IsString()
    token: string
}