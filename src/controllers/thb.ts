import { Request, Response } from 'express';
import { successResult, errorFoundResult, notFoundResult } from "../utils/apiResult";
import { getAlbumInfoByAPI, searchAlbumListByAPI } from '../services/thb';

const getTHBListByAlbum = async (request: Request, response: Response) => {
    let albumName = request.params.name;
    let list = await searchAlbumListByAPI(albumName)
    response.send(successResult("查询成功", list));
}

const getTHBInfoByAlbum = async (request: Request, response: Response) => {
    let labelName = request.params.label;
    let info = await getAlbumInfoByAPI(labelName)
    if(info)
    {
        response.send(successResult("查询成功", info));
    }
    else{
        response.send(notFoundResult("未找到结果"));
    }
}

export {
    getTHBListByAlbum,
    getTHBInfoByAlbum
}