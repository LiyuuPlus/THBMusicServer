import { TypeOrmModule, TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

const dbOptions: TypeOrmModuleAsyncOptions = {
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
        const DB_TYPE: any = config.get("DB_TYPE") || "mysql";
        const DB_HOST = config.get("DB_HOST") || "";
        const DB_PORT = Number(config.get("DB_PORT")) || 3306;
        const DB_USERNAME = config.get("DB_USERNAME") || "";
        const DB_PASSWORD = config.get("DB_PASSWORD") || "";
        const DB_DATABASE = config.get("DB_DATABASE") || "";
        console.log(`【数据库服务】：使用${DB_TYPE}数据库`);
        return {
            type: DB_TYPE,
            host: DB_HOST,
            port: DB_PORT,
            username: DB_USERNAME,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            autoLoadEntities: true
        }
    }
}
const init = TypeOrmModule.forRootAsync(dbOptions)

export { init as dbInit }