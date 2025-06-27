import { EmailService } from "../../../presentation/email/email-service";
import { LogRepository } from "../../repository/log.repository";
import { LogEntity } from "../../entities/log.entity";
import { LogSeverityLevel } from "../../entities/log.entity";

interface SendLogsUseCase {
    execute(to: string | string[]): Promise<boolean>;
}

export class SendLogs implements SendLogsUseCase {
    constructor(
        private readonly emailService: EmailService,
        private readonly logRepository: LogRepository
    ) {}

    public async execute(to: string | string[]): Promise<boolean> {
        try {
            const isSent = await this.emailService.sendEmailWithFileSystemLogs(to);
            if (!isSent) {
                throw new Error('Failed to send logs');
            }
            await this.logRepository.saveLog(new LogEntity({
                level: LogSeverityLevel.LOW,
                message: `Logs sent to ${to}`,
                origin: 'send-logs.ts'
            }));
            return true;
        } catch (error) {
            await this.logRepository.saveLog(new LogEntity({
                level: LogSeverityLevel.HIGH,
                message: `${error}`,
                origin: 'send-logs.ts'
            }));
            return false;
        }
    }
}
