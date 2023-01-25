import { Request, Response } from 'express';
import { successResult, errorFoundResult, notFoundResult } from "../apiResult";
import { createConnection } from 'typeorm';
import { VNeteaseSongs } from '../models/VNeteaseSongs';

const getTHBBySongId = async (request: Request, response: Response) => {
    let songId = Number(request.params.id);
    if (!isNaN(songId)) {
        const connection = await createConnection();
        const repository = connection.getRepository(VNeteaseSongs);
        let info = await repository.findOne({ where: { id: songId } });
        connection.close();
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
    getTHBBySongId
}