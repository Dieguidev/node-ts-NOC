import { LogEntity, LogSeverityLevel } from "../entities/log.entity";


//* la clase abstracta evita que se pueda instanciar
// por lo cual nos sirve para obligar lo que defina en esta clase


// sobre otras clases que hereden de esta clase
export abstract class LogDataSource {
  abstract saveLog(log: LogEntity): Promise<void>;
  abstract getLog(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
}



