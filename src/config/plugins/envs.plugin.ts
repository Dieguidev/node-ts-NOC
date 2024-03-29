import 'dotenv/config'
import * as env from 'env-var';

const PORT: number = env.get('PORT').required().asIntPositive();

export const envs = {
  PORT: env.get('PORT').required().asPortNumber(),
  PROD: env.get('PROD').required().asBool(),
  //nodemailer
  MAILER_EMAIL: env.get('MAILER_EMAIL').required().asEmailString(),
  MAILER_SECRET_KEY: env.get('MAILER_SECRET_KEY').required().asString(),
  MAILER_SERVICE: env.get('MAILER_SERVICE').required().asString(),
  //mongodb
  MONGO_URL: env.get('MONGO_URL').required().asString(),
  MONGODB_NAME: env.get('MONGODB_NAME').required().asString(),
  MONGO_USER: env.get('MONGO_USER').required().asString(),
  MONGO_PASS: env.get('MONGO_PASS').required().asString(),
}




