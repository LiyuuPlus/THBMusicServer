import { Request, Response } from 'express';
import got from "got";

import { Routes } from "../../router"
import * as Tools from '../../utils/tools';

import { successResult, notFoundResult, paramErrorResult } from "../../models/apiResult";

import * as NCMServices from './services/netease';

/**
 * 控制器名称
 */
export const ControllerName = "netease";

/**
 * 初始化路由
 * @returns 路由列表
 */
export const initRoutes = (): Routes => {
    let importRoutes: Routes = [];
    importRoutes = routes;
    return importRoutes;
}

const routes: Routes = [
    {
        path: "detail/:id",
        type: "GET",
        async cb(request: Request, response: Response, next: Function) {
            try {
                let id = Number(request.params.id);
                if (!isNaN(id)) {
                    let info = await NCMServices.getSongInfoByAPI(id);
                    if (info) {
                        successResult(response, "查询成功", info);
                    }
                    else {
                        notFoundResult(response, "找不到该曲目");
                    }
                }
                else {
                    paramErrorResult(response, "参数格式不正确");
                }
            } catch (err) {
                next(err);
            }
        }
    },
    {
        path: "detail/:id/thb",
        type: "GET",
        async cb(request: Request, response: Response, next: Function) {
            try {
                let id = Number(request.params.id);
                let isUpdate = request.query.update == "1";
                if (!isNaN(id)) {
                    let info = await NCMServices.getSongInfoByTHB(id, isUpdate);
                    if (info) {
                        successResult(response, "查询成功", info);
                    }
                    else {
                        notFoundResult(response, "找不到该曲目");
                    }
                }
                else {
                    paramErrorResult(response, "参数格式不正确");
                }
            } catch (err) {
                next(err);
            }
        }
    },
    {
        path: "detail/:id/thb/lyric",
        type: "GET",
        async cb(request: Request, response: Response, next: Function) {
            try {
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
                        successResult(response, "查询成功", {
                            id,
                            lyric,
                            transLyric
                        });
                    }
                    else {
                        notFoundResult(response, "找不到该曲目");
                    }
                }
                else {
                    paramErrorResult(response, "参数格式不正确");
                }
            } catch (err) {
                next(err);
            }
        }
    },
]