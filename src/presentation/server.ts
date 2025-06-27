import { FileSystemDataSource } from '../infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../infrastructure/repositories/log.repository';
import { SendLogs } from '../domain/use-cases/email/send-logs';
import { EmailService } from '../presentation/email/email-service';

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDataSource()
  // new InMemoryDataSource()
  // new DatabaseDataSource()
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
    //       fileSystemLogRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error),
    //     ).execute(url);
    //   }
    // );

    new SendLogs(emailService, fileSystemLogRepository).execute('test@example.com');
  }
}
