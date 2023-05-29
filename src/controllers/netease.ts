import { Request, Response } from 'express';
import { successResult, errorFoundResult, notFoundResult } from "../utils/apiResult";
import * as NCMServices from '../services/netease';
import * as Tools from '../utils/tools';
import got from "got";

/**
 * 获得网易云曲目详情
 * @param request 请求对象
 * @param response 响应对象
 */
export const getSongInfo = async (request: Request, response: Response) => {
    let id = Number(request.params.id);
    if (!isNaN(id)) {
        let info = await NCMServices.getSongInfoByAPI(id);
        if (info) {
            response.send(successResult("查询成功", info));
        }
        else {
            response.send(notFoundResult("找不到该曲目"));
        }
    }
    else {
        response.send(errorFoundResult("参数格式不正确"));
    }
}

/**
 * 获得网易云曲目关联的THB词条详情
 * @param request 请求对象
 * @param response 响应对象
 */
export const getSongInfoByTHB = async (request: Request, response: Response) => {
    let id = Number(request.params.id);
    let isUpdate = request.query.update == "1";
    if (!isNaN(id)) {
        let info = await NCMServices.getSongInfoByTHB(id, isUpdate);
        if (info) {
            response.send(successResult("查询成功", info));
        }
        else {
            response.send(notFoundResult("找不到该曲目"));
        }
    }
    else {
        response.send(errorFoundResult("参数格式不正确"));
    }
}

export const getLyricInfoByTHB = async (request: Request, response: Response) => {
    let id = Number(request.params.id);
    if (!isNaN(id)) {
        let info = await NCMServices.getSongInfoByTHB(id);
        if (info) {
            let lyric = "", transLyric = "";
            if (info.lyrics) {
                const { lyricUrl, transLyricUrl } = Tools.generateLyricUrl(info.lyrics, info.lyricsIndex);
                lyric = await got.get(lyricUrl).text() + "[999:999:999]歌词来自于THBWiki";
                transLyric = await got.get(transLyricUrl).text() + "[999:999:999]THBLyric";
            }
            response.send(successResult("查询成功", {
                id,
                lyric,
                transLyric
            }));
        }
        else {
            response.send(notFoundResult("找不到该曲目"));
        }
    }
    else {
        response.send(errorFoundResult("参数格式不正确"));
    }
}