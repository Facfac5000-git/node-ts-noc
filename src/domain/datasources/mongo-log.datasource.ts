import { LogDataSource } from "./log.datasource";
import { LogEntity, LogSeverityLevel } from "../entities/log.entity";
import { LogModel } from "../../data/mongo/models/log.model";

export class MongoLogDataSource implements LogDataSource {
    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await LogModel.create(log);
        await newLog.save();
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const logs = await LogModel.find({ level: severityLevel });
        return logs.map(log => LogEntity.fromObject(log));
    }
}
