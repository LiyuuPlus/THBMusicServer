import { Request, Response } from 'express';

import { Routes } from "../../router"

import * as THBServices from './services/thb';

import { successResult, notFoundResult } from "../../models/apiResult";
import { api_thb_albuminfo } from './models/response/api_thb_albuminfo';

/**
 * 控制器名称
 */
export const ControllerName: string = "thb";

/**
 * 初始化路由
 * @returns 路由列表
 */
export const initRoutes = (): Routes => {
    let importRoutes: Routes = [];
    importRoutes = routes;
    return importRoutes;
};

const routes: Routes = [
    {
        path: "/search/album/:name",
        type: "GET",
        async cb(request: Request, response: Response, next: Function) {
            try {
                let albumName = request.params.name;
                let list = await THBServices.searchAlbumListByAPI(albumName)
                successResult(response, "查询成功", list);
            } catch (err) {
                next(err);
            }
        }
    },
    {
        path: "/detail/album/:name",
        type: "GET",
        async cb(request: Request, response: Response, next: Function) {
            try {
                let labelName = request.params.label;
                let isUpdate = request.query.update == "1";
                let info = await THBServices.getAlbumInfo(labelName, isUpdate)
                if (info) {
                    //处理字段返回
                    //指定字段不返回
                    Reflect.deleteProperty(info, "id");
                    let ret = new api_thb_albuminfo();
                    let list = await THBServices.getAlbumSongs(labelName, isUpdate);
                    list = list.map(v => {
                        //指定字段不返回
                        Reflect.deleteProperty(v, "id");
                        Reflect.deleteProperty(v, "albumLabel");
                        return v;
                    })
                    ret.albumInfo = info;
                    ret.songList = list;
                    successResult(response, "查询成功", ret);
                }
                else {
                    notFoundResult(response, "未找到结果");
                }
            } catch (err) {
                next(err);
            }
        }
    },
];