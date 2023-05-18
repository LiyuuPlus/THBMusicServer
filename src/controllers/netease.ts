import { Request, Response } from 'express';
import { successResult, errorFoundResult, notFoundResult } from "../utils/apiResult";
import * as NCMServices from '../services/netease';
import got from "got";

export const getSongInfo = async (request: Request, response: Response) => {
    let id = Number(request.params.id);
    if (!isNaN(id)) {
        let info = await NCMServices.getSongInfo(id);
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


export const getSongInfoByTHB = async (request: Request, response: Response) => {
    let id = Number(request.params.id);
    if (!isNaN(id)) {
        let info = await NCMServices.getSongInfoByTHB(id);
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
                let lyricUrl = encodeURI(`https://lyrics.thwiki.cc/${info.lyrics.replace("歌词:", "")}.${info.lyricsIndex}.ja.lrc`);
                let transLyricUrl = encodeURI(`https://lyrics.thwiki.cc/${info.lyrics.replace("歌词:", "")}.${info.lyricsIndex}.zh.lrc`);
                let allLyricUrl = encodeURI(`https://lyrics.thwiki.cc/${info.lyrics.replace("歌词:", "")}.${info.lyricsIndex}.all.lrc`);
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