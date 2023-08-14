import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type BlogDocument = HydratedDocument<Blog>

@Schema()
export class Blog {
    @Prop()
    title: string

    @Prop()
    content: string

    @Prop()
    sharedBy: string

    @Prop()
    userId: string
}

export const BlogSchema = SchemaFactory.createForClass(Blog)