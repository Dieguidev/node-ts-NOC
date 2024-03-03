

import { PrismaClient } from "@prisma/client";
import { envs } from "./config/plugins/envs.plugin";
import {  MongoDatabase } from "./data/mongodb";
import { Server } from "./presentation/server";


(() => {
  main()
})();

async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGODB_NAME
  })

  // const prisma = new PrismaClient();
  // const newLog = await prisma.logModel.create({
  //   data: {
  //     message: "teste",
  //     level: "HIGH",
  //     origin: "App.ts"
  //   }
  // })

//   const logs = await prisma.logModel.findMany({
//     where: {
//       level: "MEDIUM"
//     }
//   });

// console.log(logs);


  Server.start();


}
