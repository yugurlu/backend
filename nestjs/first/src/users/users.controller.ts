
import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common'
import { CreatePersonDto } from './dto/create.users.dto'
import { UsersService } from './user.services';
import { ParamsTokenFactory } from '@nestjs/core/pipes';
import { User } from './schemas/users.schemas';

@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get()
    getall(): Promise<User[]> {
        return this.usersService.getAll()
    }

    @Get(":id")
    getOne(@Param("id") id: string): Promise<User> {
        return this.usersService.getOne(id)
    }

    @Post()
    create(@Body() allProps: CreatePersonDto): Promise<User> {
        return this.usersService.create(allProps)
    }

    @Put(":id")
    update(@Param("id") id: string, @Body() allProps: CreatePersonDto): Promise<User> {
        return this.usersService.update(id, allProps)
    }

    @Delete(":id")
    remove(@Param("id") id: string): Promise<User> {
        return this.usersService.remove(id)
    }

} 