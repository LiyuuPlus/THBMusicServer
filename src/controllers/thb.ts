import { Request, Response } from 'express';
import { successResult, errorFoundResult, notFoundResult } from "../utils/apiResult";
import * as THBServices from '../services/thb';
import { api_thb_albuminfo } from '../models/api_thb_albuminfo';

export const searchAlbumList = async (request: Request, response: Response) => {
    let albumName = request.params.name;
    let list = await THBServices.searchAlbumListByAPI(albumName)
    response.json(successResult("查询成功", list));
}

export const getAlbumInfo = async (request: Request, response: Response) => {
    let labelName = request.params.label;
    let isUpdate = request.query.update == "1";
    let info = await THBServices.getAlbumInfo(labelName, isUpdate)
    if (info) {
        let ret = new api_thb_albuminfo();
        let list = await THBServices.getAlbumSongs(labelName, isUpdate);
        ret.albumInfo = info;
        ret.songList = list;
        response.json(successResult("查询成功", ret));
    }
    else {
        response.json(notFoundResult("未找到结果"));
    }
}