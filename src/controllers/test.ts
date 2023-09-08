import { Request, Response } from 'express';
import { ThbAlbums } from '../entities/thb/ThbAlbums';
import { ThbSongs } from '../entities/thb/ThbSongs';
import { getAlbumInfoByAPI, getAlbumSongsByAPI } from '../services/thb';
import { successResult, errorResult, notFoundResult } from "../utils/apiResult";
import * as NCMServices from '../services/netease';
import * as RedisHelper from '../utils/redisHelper';
import * as NeteaseAPI from '../utils/provider/netease';
import { api_netease_link } from '../models/api_netease_link';

export const test = async (request: Request, response: Response) => {
    let testArr: api_netease_link[] = [];
    testArr.push({
        songId: 114514,
        albumLabel: "Alice in Dream",
        songIndex: 1
    });
    testArr.push({
        songId: 114515,
        albumLabel: "綴（同人专辑）",
        songIndex: 1
    });
    testArr.push({
        songId: 114516,
        albumLabel: "Alice in Dream",
        songIndex: 2
    });
    testArr.push({
        songId: 114517,
        albumLabel: "綴（同人专辑）",
        songIndex: 2
    });
    let res = await NCMServices.linkSongToTHB(testArr);
    response.json(successResult("执行成功", res));
}

export const test1 = async (request: Request, response: Response) => {
    let testArr: api_netease_link[] = [];
    testArr.push({
        songId: 114514,
        albumLabel: null,
        songIndex: null
    });
    testArr.push({
        songId: 114515,
        albumLabel: null,
        songIndex: null
    });
    testArr.push({
        songId: 114516,
        albumLabel: null,
        songIndex: null
    });
    testArr.push({
        songId: 114517,
        albumLabel: null,
        songIndex: null
    });
    let res = await NCMServices.unlinkSongToTHB(testArr);
    response.json(successResult("执行成功", res));
}