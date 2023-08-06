import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, BlogDocument } from './schemas/blog.schema';
import { Model } from 'mongoose';
import { BlogDto } from './dto/blog.dto';
import { User, UserDocument } from 'src/auth/schemas/user.schema';

@Injectable()
export class BlogsService {
    constructor(
        @InjectModel(Blog.name) private blogModel: Model<BlogDocument>, 
        @InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async createBlog(dto: BlogDto, req: any) {
        const currentUser = await this.userModel.findOne({ email: req.user.email })

        const newBlog = new this.blogModel({
            title: dto.title,
            content: dto.content,
            sharedBy: currentUser.email,
            userId: currentUser.id
        })
        return await newBlog.save()
    }

    async editBlog(dto: BlogDto, id: string, req: any) {
        const blog = await this.blogModel.findById(id)
        if (req.user.email != blog.sharedBy)
            throw new UnauthorizedException("This is not your blog!")

        return await this.blogModel.findByIdAndUpdate(id, dto, { new: true })
    }

    async removeBlog(id: string, req: any) {
        const blog = await this.blogModel.findById(id)
        if (req.user.email != blog.sharedBy)
            throw new UnauthorizedException("This is not your blog!")

        return await this.blogModel.findByIdAndRemove(id, { new: true })
    }

    async getAllBlogs() {
        return await this.blogModel.find()
    }

    async getCurrentUserBlogs(req: any) {
        const currentUser = await this.userModel.findOne({ email: req.currentUser.email })
        return await this.blogModel.find({ email: currentUser._id })
    }

    async getOneBlog(id: string) {
        return await this.blogModel.findById(id)
    }
}
