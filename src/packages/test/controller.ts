import { Request, Response } from 'express';
import { Routes } from "../../router/routes"
import { successResult} from "../../utils/apiResult";
import * as NCMServices from '../../services/netease';
import { api_netease_link } from '../../models/api_netease_link';

const ControllerName = "test";
export const initRoutes = (): Routes => {
    let importRoutes: Routes = [];
    if (process.env.NODE_ENV != "development") return importRoutes;
    importRoutes = routes.map(v => {
        v.path = `/${ControllerName}/${v.path}`;
        return v;
    })
    return importRoutes;
}
const routes: Routes = [
    {
        path: "test",
        type: "GET",
        cb: async (request: Request, response: Response) => {
            let testArr: api_netease_link[] = [];
            testArr.push({
                songId: 114514,
                albumLabel: "Alice in Dream",
                songIndex: 1
            });
            testArr.push({
                songId: 114515,
                albumLabel: "綴（同人专辑）",
                songIndex: 1
            });
            testArr.push({
                songId: 114516,
                albumLabel: "Alice in Dream",
                songIndex: 2
            });
            testArr.push({
                songId: 114517,
                albumLabel: "綴（同人专辑）",
                songIndex: 2
            });
            let res = await NCMServices.linkSongToTHB(testArr);
            response.json(successResult("执行成功", res));
        }
    },
    {
        path: "test1",
        type: "GET",
        cb: async (request: Request, response: Response) => {
            let testArr: api_netease_link[] = [];
            testArr.push({
                songId: 114514,
                albumLabel: null,
                songIndex: null
            });
            testArr.push({
                songId: 114515,
                albumLabel: null,
                songIndex: null
            });
            testArr.push({
                songId: 114516,
                albumLabel: null,
                songIndex: null
            });
            testArr.push({
                songId: 114517,
                albumLabel: null,
                songIndex: null
            });
            let res = await NCMServices.unlinkSongToTHB(testArr);
            response.json(successResult("执行成功", res));
        }
    },
    {
        path: "hello",
        type: "GET",
        async cb(request: Request, response: Response){
            response.json(successResult("helloWorld"));
        }
    },
]