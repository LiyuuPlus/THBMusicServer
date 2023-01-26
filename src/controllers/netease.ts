import { Request, Response } from 'express';
import { successResult, errorFoundResult, notFoundResult } from "../apiResult";
import { getMusicInfoBySongId, getTHBInfoBySongId } from '../services/netease';

const getSongInfo = async (request: Request, response: Response) => {
    let id = Number(request.params.id);
    if (!isNaN(id)) {
        let info = await getMusicInfoBySongId(id);
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


const getSongInfoByTHB = async (request: Request, response: Response) => {
    let id = Number(request.params.id);
    if (!isNaN(id)) {
        let info = await getTHBInfoBySongId(id);
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

export {
    getSongInfo,
    getSongInfoByTHB
}