import {config} from "dotenv";

config({path:`.env.${process.env.NODE_ENV ||  "development"}.local`});

export const {PORT,NODE_ENV,DB_URI,JWT_SECRET,JWT_EXPIRES_IN,ARCJET_ENV,ARCJET_KEY,SERVER_URL,QSTASH_URL,QSTASH_TOKON,NODEMAILER_PASSWORD} = process.env;
