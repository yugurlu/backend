import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';

@Injectable()
export class EmailVerificationService {
    private transporter

    constructor() {
        this.transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        })
    }

    async sendVerificationEmail(userEmail: string, verificationToken: string) {
        const mailOption = {
            from: "istanbul42bot@gmail.com",
            to: userEmail,
            subject: "Email Verification",
            text: `Please verify your email by clicking the following link: ${verificationToken}`
        }
        await this.transporter.sendMail(mailOption)
    }

    generateVerificationToken(): string {
        const token = crypto.randomBytes(2).toString('hex').toUpperCase();
        return token;
    }
}
