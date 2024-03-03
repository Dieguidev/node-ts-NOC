

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


  // const logs = await LogModel.find()
  // console.log(logs);




  Server.start();


}
