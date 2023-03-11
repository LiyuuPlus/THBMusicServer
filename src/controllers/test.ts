import { Request, Response } from 'express';
import { ThbAlbums } from '../entities/ThbAlbums';
import { ThbSongs } from '../entities/ThbSongs';
import { getAlbumInfoByAPI, getAlbumSongsByAPI } from '../services/thb';
import { successResult, errorFoundResult, notFoundResult } from "../utils/apiResult";
import * as RedisHelper from '../utils/redisHelper'
import * as NeteaseAPI from '../utils/provider/netease'

export const test = async (request: Request, response: Response) => {
    let res = await NeteaseAPI.searchAlbum("綴 凋叶棕");
    response.json(successResult("查询成功", res));
}

export const test1 = async (request: Request, response: Response) => {
    let res = await NeteaseAPI.searchSong("ヒカリ 綴");
    response.json(successResult("查询成功", res));
}