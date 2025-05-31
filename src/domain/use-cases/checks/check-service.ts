import { LogRepository } from "../../repository/log.repository";
import { LogEntity } from "../../entities/log.entity";
import { LogSeverityLevel } from "../../entities/log.entity";
interface CheckServiceUseCase {
  execute( url: string ):Promise<boolean>;
}

type SuccessCallback = (() => void) | undefined;
type ErrorCallback = ((error: string) => void) | undefined;

export class CheckService implements CheckServiceUseCase {

  constructor(
    private readonly logRepository: LogRepository,
    private readonly successCallback: SuccessCallback,
    private readonly errorCallback: ErrorCallback
  ) {}

  public async execute( url: string ): Promise<boolean> {
    try {
      const req = await fetch(url);
      if (!req.ok) {
        throw new Error(`Error on check service ${url}`);
      }

      this.logRepository.saveLog( new LogEntity(LogSeverityLevel.LOW, `Check service ${url}`));
      this.successCallback && this.successCallback();
      return true;
    } catch (error) {
      const errorMessage = `${error}`;

      this.logRepository.saveLog(new LogEntity(LogSeverityLevel.HIGH, errorMessage));

      this.errorCallback && this.errorCallback(errorMessage);

      return false;
    }
  }
}
