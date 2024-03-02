import { envs } from "../config/plugins/envs.plugin";
import { CheckService } from "../domain/use-cases/checks/check.use-case";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.use-case";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imple";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)

const emailService = new EmailService();


export class Server {

  public static start() {
    console.log('Server started...');

    //mandar email
    // new SendEmailLogs(
    //   emailService,
    //   fileSystemLogRepository
    // ).execute(['diegogaraycullas@gmail.com', 'elizabethgalvansandoval@gmail.com'])





    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     // const url = 'http://localhost:3000'
    //     const url = 'https://google.com'

    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error)
    //     ).execute(url);
    //     // new CheckService().execute('http://localhost:3000');

    //   }
    // )

  }
}
