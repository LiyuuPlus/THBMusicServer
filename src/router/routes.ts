import express from 'express';
import { appPackage, appPackages } from '../core';

export interface callback {
    (request: express.Request, response: express.Response): void;
}

export type Routes = {
    path: string;
    type: "GET" | "POST" | "DELETE" | "PUT";
    cb: callback;
}[];

let tmpRoutes: Routes = [];
const loadController = (appPack: appPackage) => {
    try {
        const c = require(appPack.controller);
        let routes: Routes = c?.initRoutes();
        if (routes && routes.length > 0) {
            tmpRoutes.push(...routes);
        }
    } catch {

    }
}
for (const appPack of appPackages) {
    loadController(appPack);
}
export const routes: Routes = [
    { path: "/", type: "GET", cb: (requst, response) => { response.send("东方音乐信息查询服务") } },
    ...tmpRoutes,
];