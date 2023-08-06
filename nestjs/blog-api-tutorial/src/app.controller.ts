import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(AuthGuard("jwt"))
  @Get()
  getHello(@Request() req: any): string {
    console.log(req.user)
    return this.appService.getHello();
  }
}
