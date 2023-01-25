import express from 'express';
import { getTHBBySongId } from './controllers/netease';

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
    { path: "/netease/:id", type: "GET", cb: getTHBBySongId },
];