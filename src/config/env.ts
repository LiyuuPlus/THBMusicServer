import path from 'path';
import * as dotenv from "dotenv";

const rootPath = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`);
dotenv.config({ path: rootPath });