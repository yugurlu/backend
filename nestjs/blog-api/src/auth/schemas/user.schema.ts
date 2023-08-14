import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>

@Schema()
export class EmailVerification {
    @Prop({ default: false }) 
    isVerified: boolean

    @Prop({ default: "" })
    token: string

    @Prop({ default: Date.now()})
    verifiyCodeExpiresAt: Date
}

@Schema()
export class User {
    @Prop()
    email: string

    @Prop()
    password: string

    @Prop({ type: EmailVerification, default: () => new EmailVerification() })
    emailVerification: EmailVerification;
}



export const UserSchema = SchemaFactory.createForClass(User)