

import { envs } from "./config/plugins/envs.plugin";
import { MongoDatabase } from "./data/mongodb/init";
import { Server } from "./presentation/server";


(() => {
  main()
})();

async function main() {

  await MongoDatabase.connect({
    mongoUrl: envs.MONGO_URL,
    dbName: envs.MONGODB_NAME
  })

  // Server.start();
  // console.log(envs);

}
