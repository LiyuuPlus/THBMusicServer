import { CacheModule, CacheModuleOptions } from '@nestjs/cache-manager';
import type { RedisClientOptions } from 'redis';
import { redisStore } from 'cache-manager-redis-yet';

const REDIS_USE = (process.env.REDIS_USE || "0") == "1";
const REDIS_HOST = process.env.REDIS_HOST || "";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_DB = Number(process.env.REDIS_DB) || 1;

let cacheOptions: CacheModuleOptions = {
    isGlobal: true,
};
let redisCacheOptions: CacheModuleOptions<RedisClientOptions> = {
    isGlobal: true,
    store: redisStore,
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT,
    },
    database: REDIS_DB
}
const init = REDIS_USE ? CacheModule.register<RedisClientOptions>(redisCacheOptions) : CacheModule.register(cacheOptions);
export { init as cacheInit }