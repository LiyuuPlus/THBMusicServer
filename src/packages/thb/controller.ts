import { Request, Response } from 'express';
import { Routes } from "../../router/routes"
import { successResult, notFoundResult } from "../../utils/apiResult";
import * as THBServices from './services/thb';
import { api_thb_albuminfo } from './models/api_thb_albuminfo';

const ControllerName = "thb";
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
        path: "search/album/:name",
        type: "GET",
        async cb(request: Request, response: Response) {
            let albumName = request.params.name;
            let list = await THBServices.searchAlbumListByAPI(albumName)
            response.json(successResult("查询成功", list));
        }
    },
    {
        path: "detail/album/:name",
        type: "GET",
        async cb(request: Request, response: Response) {
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
                response.json(successResult("查询成功", ret));
            }
            else {
                response.json(notFoundResult("未找到结果"));
            }
        }
    },
]