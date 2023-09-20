import { TypeOrmModule,TypeOrmModuleOptions } from '@nestjs/typeorm';

const DB_TYPE:any = process.env.DB_TYPE || "mysql";
const DB_HOST = process.env.DB_HOST || "";
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "";
const dbOptions: TypeOrmModuleOptions = {
    type:DB_TYPE,
    host:DB_HOST,
    port:DB_PORT,
    username:DB_USERNAME,
    password:DB_PASSWORD,
    database:DB_DATABASE,
    entities:["src/**/**.entity{.ts,.js}"],
};

const init = TypeOrmModule.forRoot(dbOptions);
export { init as dbInit }