import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { SendLogs } from '../domain/use-cases/email/send-logs';
import { EmailService } from '../presentation/email/email-service';
import { MongoLogDataSource } from '../domain/datasources/mongo-log.datasource';
import { LogSeverityLevel } from '../domain/entities/log.entity';
import { PostgresLogDataSource } from '../domain/datasources/postgres-log.datasource';

const LogRepository = new LogRepositoryImpl(
  // new FileSystemDataSource()
  // new MongoLogDataSource()
  new PostgresLogDataSource()
);

const emailService = new EmailService();

export class Server {
  public static start() {
    console.log('Server started...');
    
    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       LogRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error),
    //     ).execute(url);
    //   }
    // );

    // new SendLogs(emailService, fileSystemLogRepository).execute('test@example.com');

    // const logs = LogRepository.getLogs(LogSeverityLevel.LOW);
    new SendLogs(emailService, LogRepository).execute('test@example.com');
  }
}
