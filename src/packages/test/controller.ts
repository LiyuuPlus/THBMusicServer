import { Request, Response } from 'express';

import { Routes } from "../../router"

import * as NCMServices from '../netease/services/netease';

import { successResult } from "../../models/apiResult";
import { api_netease_link } from '../netease/models/request/api_netease_link';

/**
 * 控制器名称
 */
export const ControllerName = "test";

/**
 * 初始化路由
 * @returns 路由列表
 */
export const initRoutes = (): Routes => {
    let importRoutes: Routes = [];
    if (process.env.NODE_ENV != "development") return importRoutes;
    importRoutes = routes;
    return importRoutes;
}

const routes: Routes = [
    {
        path: "/test",
        type: "GET",
        cb: async (request: Request, response: Response, next: Function) => {
            try {
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
                successResult(response, "执行成功", res);
            } catch (err) {
                next(err);
            }
        }
    },
    {
        path: "/test1",
        type: "GET",
        cb: async (request: Request, response: Response, next: Function) => {
            try {
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
                successResult(response, "执行成功", res);
            } catch (err) {
                next(err);
            }
        }
    },
    {
        path: "/hello",
        type: "GET",
        async cb(request: Request, response: Response, next: Function) {
            successResult(response, "helloWorld");
        }
    },
]