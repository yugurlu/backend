
import { IsNotEmpty, IsString } from 'class-validator';


export class AskVerifyDto {
    @IsNotEmpty()
    @IsString()
    email: string
}