import express from 'express';
import path from 'path';
import fs from "fs";
import { appPackage, appPackages } from '../core'
// import * as TestController from '../controllers/test'
import * as NeteaseController from '../controllers/netease';
import * as THBController from '../controllers/thb';

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

const neteaseRoutes: Routes = [
    { path: "/netease/detail/:id", type: "GET", cb: NeteaseController.getSongInfo },
    { path: "/netease/detail/:id/thb", type: "GET", cb: NeteaseController.getSongInfoByTHB },
    { path: "/netease/detail/:id/thb/lyric", type: "GET", cb: NeteaseController.getLyricInfoByTHB },
];

const THBRoutes: Routes = [
    { path: "/thb/search/album/:name", type: "GET", cb: THBController.searchAlbumList },
    { path: "/thb/detail/album/:label", type: "GET", cb: THBController.getAlbumInfo },
];
export const routes: Routes = [
    { path: "/", type: "GET", cb: (requst, response) => { response.send("东方音乐信息查询服务") } },
    ...tmpRoutes,
    ...neteaseRoutes,
    ...THBRoutes
];