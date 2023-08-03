
import { Controller, Delete, Get, Patch, Post, Put, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { AdminInterface } from './admin.interface'


@Controller("admin")
export class AdminController {
  private admin: AdminInterface[] = []

  @Get()
  getAdmins(): AdminInterface[] {
    return this.admin
  }

  @Post()
  addAdmin(admin: AdminInterface) {
    var admin = admin

    admin = {
      name: "yusuf",
      age: 20,
      surname: "ugurlu"
    }
    this.admin.push(admin)

    return "ADD ADMIN"
  } 

  @Delete()                          
  deleteAdmin(admin: AdminController) {
    var admin = admin;
    this.admin = [];

    return this.admin;
  }
}
