import { Request, Response } from 'express';
import { successResult, errorFoundResult, notFoundResult } from "../apiResult";
import { getAlbumInfoByAPI } from '../services/thb';

const getTHBInfoByAlbum = async (request: Request, response: Response) => {
    let albumName = request.params.name;
    let info = await getAlbumInfoByAPI(albumName)
    if (info) {
        response.send(successResult("查询成功", info));
    }
    else {
        response.send(notFoundResult("未找到结果"));
    }
}

export {
    getTHBInfoByAlbum
}