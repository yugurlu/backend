
import { Body, Controller, Get, Post, Param } from '@nestjs/common'
import { CreatePersonDto } from './dto/create.users.dto'
import { UsersService } from './user.services';

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getall() {
        return this.usersService.findall()
    }

    @Get(":id")
    getOne(@Param("id") id) {
        return `this id ${id}`
    }

    @Post()
    create(@Body() person: CreatePersonDto) {
        return `User created!\nUsername: ${person.username}\nAge: ${person.age}`
    }
} 