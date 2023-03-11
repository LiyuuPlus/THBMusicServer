import path from 'path';
import * as dotenv from "dotenv";

let envFile = ".env";
if(process.env.NODE_ENV)
{
    envFile = `${envFile}.${process.env.NODE_ENV}`;
}
const rootPath = path.resolve(process.cwd(), envFile);
dotenv.config({ path: rootPath });