import express from 'express';

import { appPackage, appPackages } from '../core';

import { Controller } from "../models/controller"

export interface callback {
  (request: express.Request, response: express.Response, next: express.NextFunction): void;
}

export type Routes = {
  path: string;
  type: "GET" | "POST" | "DELETE" | "PUT";
  cb: callback;
}[];

let controllers: string[] = [];
let tmpRoutes: Routes = [];

/**
 * 加载控制器
 * @param appPack 应用包体
 */
const loadController = (appPack: appPackage) => {
  try {
    const c: Controller = require(appPack.controller);
    if (c) {
      const controllerName = c?.ControllerName;
      if (controllers.findIndex(el => el == controllerName) >= 0) {
        throw new Error("不能注册重复的控制器");
      }
      let routes: Routes = c?.initRoutes();
      if (routes && routes.length > 0) {
        tmpRoutes.push(...routes.map(v => {
          v.path = `/${c.ControllerName}${v.path}`;
          return v;
        }));
        controllers.push(controllerName);
      }
    }
  } catch (err) {
    console.error(err);
  }
}

for (const appPack of appPackages) {
  loadController(appPack);
}

export const routes: Routes = [
  { path: "/", type: "GET", cb: (requst, response) => { response.send("东方音乐信息查询服务") } },
  ...tmpRoutes,
];

let router = express.Router();

routes.map((value) => {
  const { path, type, cb } = value;
  if (type === "GET") {
    router.get(path, cb);
  }
  if (type === "POST") {
    router.post(path, cb);
  }
  if (type === "DELETE") {
    router.delete(path, cb);
  }
  if (type === "PUT") {
    router.put(path, cb);
  }
});

export default router;