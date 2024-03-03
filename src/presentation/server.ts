import { envs } from "../config/plugins/envs.plugin";
import { LogSeverityLevel } from "../domain/entities/log.entity";
import { CheckService } from "../domain/use-cases/checks/check.use-case";
import { SendEmailLogs } from "../domain/use-cases/email/send-email-logs.use-case";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { MongoLOgDataSource } from "../infrastructure/datasources/mongo-log.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imple";
import { CronService } from "./cron/cron-service";
import { EmailService } from "./email/email-service";

const logRepository = new LogRepositoryImpl(
  new FileSystemDatasource(),
  // new MongoLOgDataSource()
)

const emailService = new EmailService();


export class Server {

  public static async start() {
    console.log('Server started...');

    //mandar email
    // new SendEmailLogs(
    //   emailService,
    //   logRepository
    // ).execute(['diegogaraycullas@gmail.com', 'elizabethgalvansandoval@gmail.com'])


    const logs = await logRepository.getLog(LogSeverityLevel.high);
    console.log(logs);




    // CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     // const url = 'http://localhost:3000'
    //     const url = 'https://google.com'

    //     new CheckService(
    //       logRepository,
    //       () => console.log(`${url} is ok`),
    //       (error) => console.log(error)
    //     ).execute(url);
    //     // new CheckService().execute('http://localhost:3000');

    //   }
    // )

  }
}
