import fs from 'fs'

import { LogDataSource } from "../../domain/datasources/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";



export class FileSystemDatasource implements LogDataSource {

  private readonly logPath = 'logs/'
  private readonly allLogsPath = 'logs/logs-all.log';
  private readonly mediumLogsPath = 'logs/logs-medium.log';
  private readonly highLogsPath = 'logs/logs-high.log';


  constructor() {
    this.createLogsFiles();
  }

  private createLogsFiles = () => {
    if (!fs.existsSync(this.logPath)) {
      fs.mkdirSync(this.logPath);
    }

    [
      this.allLogsPath,
      this.mediumLogsPath,
      this.highLogsPath
    ].forEach(path => {
      if (!fs.existsSync(path)) {
        fs.writeFileSync(path, '');
      }
    })
  }

  async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJson = `${JSON.stringify(newLog)}\n`

    // appendFileSync: va al archivo y graba una linea al final
    fs.appendFileSync(this.allLogsPath, logAsJson);

    if (newLog.level === LogSeverityLevel.low) return;

    if (newLog.level === LogSeverityLevel.medium) {
      fs.appendFileSync(this.mediumLogsPath, logAsJson);
      return
    } else {
      fs.appendFileSync(this.highLogsPath, logAsJson);
    }
  }



  getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
    throw new Error("Method not implemented.");
  }

}
