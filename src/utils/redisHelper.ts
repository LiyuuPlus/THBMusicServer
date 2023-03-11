import { RedisSource } from '../config/dataSource';

/**
 * 从Redis读取缓存数据
 * @param key 键
 * @returns 
 */
export const get = async (key: string): Promise<string | null> => {
    return new Promise(async (resolve, reject) => {
        RedisSource.get(key).then(async (res) => {
            return resolve(res);
        }).catch(err => {
            console.log(err);
            resolve(err);
        });
    })
}

/**
 * 从Redis读取缓存数据（含自动保存）
 * @param key 键
 * @param fetcher 当无缓存时需要执行的操作
 * @param ttl 前置操作保存缓存时间
 * @param isUpdate 是否更新缓存
 * @returns 
 */
export const getAsync = async<T>(key: string, fetcher: () => Promise<T>, ttl: number = 2592000, isUpdate: boolean = false): Promise<T> => {
    return new Promise(async (resolve, reject) => {
        if (isUpdate) {
            const result = await fetcher();
            set(key, result, ttl);
            return resolve(result);
        }
        RedisSource.get(key).then(async (res) => {
            if (res) {
                return resolve(JSON.parse(res));
            }
            const result = await fetcher();
            set(key, result, ttl);
            return resolve(result);
        }).catch(err => {
            console.log(err);
            resolve(err);
        });
    })
}

/**
 * 写入数据到Redis
 * @param key 键
 * @param value 需要写入的值
 * @param ttl 缓存时间
 * @returns 
 */
export const set = async (key: string, value: any, ttl: number = 2592000) => {
    return new Promise(async (resolve, reject) => {
        if (typeof value == "object") {
            value = JSON.stringify(value);
        }
        RedisSource.set(key, value).then((res) => {
            if (ttl > 0) {
                RedisSource.expire(key, ttl);
            }
            return resolve(res);
        }).catch(err => {
            console.log(err);
            return resolve(err);
        });
    })
}