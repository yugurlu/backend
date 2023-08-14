import { Body, Controller, Post, UseGuards, Request, Param, Put, Delete, Get, Req } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('blogs')
export class BlogsController {
    constructor(private blogService: BlogsService) {}

    @UseGuards(AuthGuard("jwt"))
    @Post()
    createBlog(@Body() dto: BlogDto, @Request() req: any) {
        return this.blogService.createBlog(dto, req)
    }

    @UseGuards(AuthGuard("jwt"))
    @Put(":id")
    editBlog(@Body() dto: BlogDto, @Param("id") id: string, @Request() req: any) {
        return this.blogService.editBlog(dto, id, req)
    }

    @UseGuards(AuthGuard("jwt"))
    @Delete(":id")
    removeBlog(@Param("id") id: string, @Request() req: any) {
        return this.blogService.removeBlog(id, req)
    }

    @Get()
    getAllBlogs() {
        return this.blogService.getAllBlogs()
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("my-blogs")
    getCurrentUserBlogs(@Request() req: any) {
        return this.blogService.getCurrentUserBlogs(req)
    }

    @Get(":id")
    getOneBlog(@Param("id") id: string) {
        return this.blogService.getOneBlog(id)
    }
}
