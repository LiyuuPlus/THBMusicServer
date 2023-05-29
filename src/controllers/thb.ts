import { Request, Response } from 'express';
import { successResult, errorFoundResult, notFoundResult } from "../utils/apiResult";
import * as THBServices from '../services/thb';
import { api_thb_albuminfo } from '../models/api_thb_albuminfo';

/**
 * 根据词条名模糊搜索THB专辑
 * @param request 请求对象
 * @param response 响应对象
 */
export const searchAlbumList = async (request: Request, response: Response) => {
    let albumName = request.params.name;
    let list = await THBServices.searchAlbumListByAPI(albumName)
    response.json(successResult("查询成功", list));
}

/**
 * 根据THB词条获得THB专辑信息
 * @param request 请求对象
 * @param response 响应对象
 */
export const getAlbumInfo = async (request: Request, response: Response) => {
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