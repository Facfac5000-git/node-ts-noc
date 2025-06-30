import 'dotenv/config';
import { envsPlugin } from './config/plugin/envs.plugin';
import { Server } from './presentation/server';
import { MongoDatabase } from './data/mongo';
import { LogModel } from './data/mongo/models/log.model';
import { PrismaClient } from '@prisma/client';
import { LogSeverityLevel } from './domain/entities/log.entity';

(async() => {
  main();
})();

async function main(){
  const { MONGO_URL, MONGO_DB_NAME } = envsPlugin();
  await MongoDatabase.connect({
    mongoUrl: MONGO_URL!,
    dbName: MONGO_DB_NAME!
  });

  // const newLog = new LogModel({
  //   level: 'low',
  //   message: 'Test log',
  //   origin: 'App.ts'
  // });
  // console.log(newLog);
  // await newLog.save();

  // const prisma = new PrismaClient();
  // const newLog = await prisma.log.create({
  //   data: {
  //     level: 'LOW',
  //     message: 'Test log',
  //     origin: 'App.ts'
  //   }
  // });
  // console.log(newLog);
  // await prisma.$disconnect();

  Server.start();
}
