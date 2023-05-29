import { Request, Response } from 'express';
import { ThbAlbums } from '../entities/ThbAlbums';
import { ThbSongs } from '../entities/ThbSongs';
import { getAlbumInfoByAPI, getAlbumSongsByAPI } from '../services/thb';
import { successResult, errorFoundResult, notFoundResult } from "../utils/apiResult";
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
        albumLabel: "缀",
        songIndex: 1
    });
    testArr.push({
        songId: 114516,
        albumLabel: "Alice in Dream",
        songIndex: 2
    });
    testArr.push({
        songId: 114517,
        albumLabel: "缀",
        songIndex: 2
    });
    let res = NCMServices.linkSongToTHB(testArr);
    response.json(successResult("执行成功", res));
}

export const test1 = async (request: Request, response: Response) => {
    let res = await NeteaseAPI.searchSong("ヒカリ 綴");
    response.json(successResult("查询成功", res));
}