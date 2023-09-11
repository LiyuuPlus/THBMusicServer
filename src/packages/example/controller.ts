import { Request, Response } from 'express';

import { Routes } from "../../router"

import { successResult } from "../../models/apiResult";

/**
 * 控制器名称
 */
const ControllerName = "example";

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

export const routes: Routes = [
    {
        path: "/example",
        type: "GET",
        cb: async (request: Request, response: Response, next: Function) => {
            successResult(response, "这是个示例");
        }
    },
]