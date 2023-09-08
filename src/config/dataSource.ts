import { DataSource } from 'typeorm';
import * as redis from 'redis';

//thb
import { ThbAlbums } from '../entities/thb/ThbAlbums';
import { ThbSongs } from '../entities/thb/ThbSongs';
import { VThbSongs } from '../entities/thb/VThbSongs';

//netease
import { NeteaseThbsonglink } from '../entities/netease/NeteaseThbsonglink';
import { VNeteaseThbsonglink } from '../entities/netease/VNeteaseThbsonglink';

const DB_HOST = process.env.DB_HOST || "";
const DB_PORT = Number(process.env.DB_PORT) || 3306;
const DB_USERNAME = process.env.DB_USERNAME || "";
const DB_PASSWORD = process.env.DB_PASSWORD || "";
const DB_DATABASE = process.env.DB_DATABASE || "";
export const DBSource = new DataSource({
    type: "mysql",
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    timezone: "+08:00",
    synchronize: false,
    logging: false,
    entities: [
        ThbAlbums,
        ThbSongs,
        VThbSongs,
        NeteaseThbsonglink,
        VNeteaseThbsonglink,
    ],
});

const REDIS_HOST = process.env.REDIS_HOST || "";
const REDIS_PORT = Number(process.env.REDIS_PORT) || 6379;
const REDIS_DB = Number(process.env.REDIS_DB) || 1;
export const RedisSource = redis.createClient({
    socket:{
        host:REDIS_HOST,
        port:REDIS_PORT,
        
    },
    database:REDIS_DB
});