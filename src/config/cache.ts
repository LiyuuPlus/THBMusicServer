import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { ConfigService } from '@nestjs/config';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

let REDIS_USE = false;
let cacheOptions: CacheModuleAsyncOptions<RedisClientOptions> = {
    inject: [ConfigService],
    useFactory: async (config: ConfigService) => {
        const REDIS_USE = (config.get("REDIS_USE") || "0") == "1";
        const REDIS_HOST = config.get("REDIS_HOST") || "";
        const REDIS_PORT = Number(config.get("REDIS_PORT")) || 6379;
        const REDIS_DB = Number(config.get("REDIS_DB")) || 1;
        console.log(`【缓存服务】：${REDIS_USE ? "使用Redis缓存" : "使用内存缓存"}`);
        return REDIS_USE ? {
            isGlobal: true,
            store: redisStore,
            socket: {
                host: REDIS_HOST,
                port: REDIS_PORT,
            },
            database: REDIS_DB
        } : {
            isGlobal: true,
        };
    }
}
const init = CacheModule.registerAsync<RedisClientOptions>(cacheOptions);
export { init as cacheInit }