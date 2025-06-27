import nodemailer from 'nodemailer';
import { envsPlugin } from '../../config/plugin/envs.plugin';

const { MAILER_SERVICE, MAILER_EMAIL, MAILER_SECRET_KEY } = envsPlugin();

interface SendEmailOptions {
    to: string | string[];
    subject: string;
    htmlBody: string;
    attachments?: Attachment[];
}

interface Attachment {
    filename: string;
    path: string;
}

export class EmailService {
    private readonly transporter: nodemailer.Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: MAILER_SERVICE,
            port: 587,
            auth: {
                user: MAILER_EMAIL,
                pass: MAILER_SECRET_KEY
            }
        });

    }

    async sendEmail( options: SendEmailOptions ): Promise<nodemailer.SendMailOptions> {
        try {
            const info = await this.transporter.sendMail({
                from: MAILER_EMAIL,
                to: options.to,
                subject: options.subject,
                html: options.htmlBody,
                attachments: options.attachments || []
            });
            return info;
        } catch (error) {
            console.error(error);
            return {};
        }
    }

    sendEmailWithFileSystemLogs( to: string | string[] ) {
        const subject = `Email Service - Logs del Servidor`;
        const htmlBody = `<h1>Logs del Servidor</h1><br/>`;
        const attachments: Attachment[] = [
            { filename: 'logs.high.log', path: './logs/high.log' },
            { filename: 'logs.medium.log', path: './logs/medium.log' },
            { filename: 'logs.low.log', path: './logs/low.log' }
        ];
        return this.sendEmail({
            to,
            subject,
            htmlBody,
            attachments
        });
    }
}