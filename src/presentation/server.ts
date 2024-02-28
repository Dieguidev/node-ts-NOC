import { CheckService } from "../domain/use-cases/checks/check.use-case";
import { FileSystemDatasource } from "../infrastructure/datasources/file-system.datasource";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.imple";
import { CronService } from "./cron/cron-service";

const fileSystemLogRepository = new LogRepositoryImpl(
  new FileSystemDatasource()
)


export class Server {

  public static start() {
    console.log('Server started...');

    CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'http://localhost:3000'

        new CheckService(
          fileSystemLogRepository,
          () => console.log(`${url} is ok`),
          (error) => console.log(error)
        ).execute(url);
        // new CheckService().execute('http://localhost:3000');

      }
    )

  }
}
