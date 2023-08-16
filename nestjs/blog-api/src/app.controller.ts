import { Controller, Get, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { CookieAuthGuard } from './auth/cookie-auth.guard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(/*AuthGuard("jwt"),*/ CookieAuthGuard)
  @Get()
  getHello(@Request() req: any): string {
    return this.appService.getHello();
  }
}
