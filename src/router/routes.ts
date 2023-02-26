import express from 'express';
import { getSongInfo, getSongInfoByTHB } from '../controllers/netease';
import { getTHBListByAlbum,getTHBInfoByAlbum } from '../controllers/thb';

interface callback {
    (request: express.Request, response: express.Response): void;
}

type Routes = {
    path: string;
    type: "GET" | "POST" | "DELETE" | "PUT";
    cb: callback;
}[];

export const routes: Routes = [
    { path: "/", type: "GET", cb: (requst, response) => { response.send("THB音乐API查询服务") } },
    { path: "/netease/:id", type: "GET", cb: getSongInfo },
    { path: "/netease/thbinfo/:id", type: "GET", cb: getSongInfoByTHB },
    { path: "/thb/album/:name", type: "GET", cb: getTHBListByAlbum },
    { path: "/thb/album/detail/:label", type: "GET", cb: getTHBInfoByAlbum },
];