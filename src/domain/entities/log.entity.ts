export enum LogSeverityLevel {
    LOW = 'low',
    MEDIUM = 'medium',
    HIGH = 'high'
}

export class LogEntity {
    public level: LogSeverityLevel;
    public message: string;
    public createdAt: Date;

    constructor( level: LogSeverityLevel, message: string, createdAt?: Date ) {
        this.level = level;
        this.message = message;
        this.createdAt = createdAt || new Date();
    }

    static fromJson( json: string ): LogEntity {
        const { level, message, createdAt } = JSON.parse(json);
        return new LogEntity(level, message, new Date(createdAt));
    }

}