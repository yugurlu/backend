import { Body, Controller, Post, UseGuards, Request, Param, Put, Delete, Get, Req } from '@nestjs/common';
import { BlogsService } from './blogs.service';
import { BlogDto } from './dto/blog.dto';
import { CookieAuthGuard } from 'src/auth/cookie-auth.guard';

@Controller('blogs')
export class BlogsController {
    constructor(private blogService: BlogsService) {}

    @UseGuards(CookieAuthGuard)
    @Post()
    createBlog(@Body() dto: BlogDto, @Request() req: any) {
        return this.blogService.createBlog(dto, req)
    }

    @UseGuards(CookieAuthGuard)
    @Put(":id")
    editBlog(@Body() dto: BlogDto, @Param("id") id: string, @Request() req: any) {
        return this.blogService.editBlog(dto, id, req)
    }

    @UseGuards(CookieAuthGuard)
    @Delete(":id")
    removeBlog(@Param("id") id: string, @Request() req: any) {
        return this.blogService.removeBlog(id, req)
    }
    
    @UseGuards(CookieAuthGuard)
    @Get("my-blogs")
    getCurrentUserBlogs(@Request() req: any) {
        return this.blogService.getCurrentUserBlogs(req)
    }

    @Get()
    getAllBlogs() {
        return this.blogService.getAllBlogs()
    }

    @Get(":id")
    getOneBlog(@Param("id") id: string) {
        return this.blogService.getOneBlog(id)
    }
}
