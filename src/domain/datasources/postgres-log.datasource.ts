import { LogDataSource } from "./log.datasource";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const severityLevelMap: Record<LogSeverityLevel, string> = {
    [LogSeverityLevel.LOW]: 'LOW',
    [LogSeverityLevel.MEDIUM]: 'MEDIUM',
    [LogSeverityLevel.HIGH]: 'HIGH'
};

export class PostgresLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        await prisma.logModel.create({
            data: {
                level: severityLevelMap[log.level],
                message: log.message,
                origin: log.origin
            }
        });
        await prisma.$disconnect();
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await prisma.logModel.findMany({
            where: {
                level: severityLevelMap[severityLevel]
            }
        });
        await prisma.$disconnect();
        return logs.map(LogEntity.fromObject);
    }
}