export enum LogSeverityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export interface LogEntityOptions {
    level: LogSeverityLevel;
    message: string;
    createdAt?: Date;
    origin: string;
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;
    public origin: string;

    constructor( options: LogEntityOptions ) {
        this.level = options.level;
        this.message = options.message;
        this.createdAt = options.createdAt || new Date();
        this.origin = options.origin;
    }

    static fromJson( json: string ): LogEntity {
        const { level, message, createdAt, origin } = JSON.parse(json);
        return new LogEntity({ level, message, createdAt, origin });
    }
}