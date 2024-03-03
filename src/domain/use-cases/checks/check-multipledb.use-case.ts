import { LogEntity, LogSeverityLevel } from "../../entities/log.entity";
import { LogRepository } from "../../repository/log.repository";

interface CheckServiceMultipleUseCase {
  execute(url: string): Promise<boolean>;
}


type SucessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {

  constructor(
    private readonly logRepository: LogRepository[],
    private readonly successCallback: SucessCallback,
    private readonly errorCallback: ErrorCallback,
  ) { }

    //metodo para recorrer todos los repositorios y llamar al metodo saveLog de cada uno de ellos.
  private callLogs(log: LogEntity) {
    this.logRepository.forEach(logRepository => {
      logRepository.saveLog(log);
    })
  }


  public async execute(url: string): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      const log = new LogEntity({
        message:`Service ${url} working`,
        level:LogSeverityLevel.low,
        origin: 'check.use-case.ts',
      });
      this.callLogs(log);
      this.successCallback && this.successCallback();

      return true;
    } catch (error) {
      const errorMessage = `${url} is not ok. ${error}`;
      const log = new LogEntity({
        origin: 'check.use-case.ts',
        message: errorMessage,
        level: LogSeverityLevel.high,
      });
      this.callLogs(log);
      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }


  }
}
