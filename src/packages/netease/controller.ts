import { Request, Response } from 'express';
import { Routes } from "../../router/routes"
import { successResult, notFoundResult, paramErrorResult } from "../../utils/apiResult";
import * as NCMServices from './services/netease';
import * as Tools from '../../utils/tools';
import got from "got";

const ControllerName = "netease";
export const initRoutes = (): Routes => {
    let importRoutes: Routes = [];
    importRoutes = routes.map(v => {
        v.path = `/${ControllerName}/${v.path}`;
        return v;
    })
    return importRoutes;
}

const routes: Routes = [
    {
        path: "detail/:id",
        type: "GET",
        async cb(request: Request, response: Response) {
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
                response.send(paramErrorResult("参数格式不正确"));
            }
        }
    },
    {
        path: "detail/:id/thb",
        type: "GET",
        async cb(request: Request, response: Response) {
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
                response.send(paramErrorResult("参数格式不正确"));
            }
        }
    },
    {
        path: "detail/:id/thb/lyric",
        type: "GET",
        async cb(request: Request, response: Response) {
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
                response.send(paramErrorResult("参数格式不正确"));
            }
        }
    },
]