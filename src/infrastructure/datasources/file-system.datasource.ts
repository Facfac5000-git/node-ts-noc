import { LogDataSource } from '../../domain/datasources/log.datasource';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entity';
import fs from 'fs';

export class FileSystemDataSource implements LogDataSource {
    
    private readonly logPath: string = './logs';
    private readonly lowLogPath: string = './logs/low.logs.log';
    private readonly mediumLogPath: string = './logs/medium.logs.log';
    private readonly highLogPath: string = './logs/high.logs.log';

    constructor() {
        this.createLogFiles();
    }

    private createLogFiles(): void {
        if (!fs.existsSync(this.logPath)) {
            fs.mkdirSync(this.logPath);
        }
        [this.lowLogPath, this.mediumLogPath, this.highLogPath].forEach( path => {
            if (!fs.existsSync(path)) {
                fs.writeFileSync(path, '');
            }
        });
    }
    
    saveLog( log: LogEntity ): Promise<void> {
        const logJson = JSON.stringify(log);
        fs.appendFileSync(this.lowLogPath, `${logJson}\n`);
        if (log.level === LogSeverityLevel.MEDIUM) {
            fs.appendFileSync(this.mediumLogPath, `${logJson}\n`);
        }
        if (log.level === LogSeverityLevel.HIGH) {
            fs.appendFileSync(this.highLogPath, `${logJson}\n`);
        }
        return Promise.resolve();
    }

    async getLogs( severityLevel: LogSeverityLevel ): Promise<LogEntity[]> {
        switch (severityLevel) {
            case LogSeverityLevel.LOW:
                return this.getLogsFromPath(this.lowLogPath);
            case LogSeverityLevel.MEDIUM:
                return this.getLogsFromPath(this.mediumLogPath);
            case LogSeverityLevel.HIGH:
                return this.getLogsFromPath(this.highLogPath);
            default:
                throw new Error('SecurityLevel not implemented');
        }
    }

    private getLogsFromPath( path: string ): LogEntity[] {
        const content = fs.readFileSync(path, 'utf-8');
        const logs = content.split('\n').filter( log => log !== '' );
        return logs.map( log => LogEntity.fromJson(log) );
    }
}
