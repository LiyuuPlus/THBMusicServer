import express from 'express';
import * as TestController from '../controllers/test'
import * as NeteaseController from '../controllers/netease';
import * as THBController from '../controllers/thb';

interface callback {
    (request: express.Request, response: express.Response): void;
}

type Routes = {
    path: string;
    type: "GET" | "POST" | "DELETE" | "PUT";
    cb: callback;
}[];

const testRoutes: Routes = [
    { path: "/test/test", type: "GET", cb: TestController.test },
    // { path: "/test/test1", type: "GET", cb: TestController.test1 },
];

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
    ...testRoutes,
    ...neteaseRoutes,
    ...THBRoutes
];