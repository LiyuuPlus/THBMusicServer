import "./config/env";
import "reflect-metadata";
import "module-alias/register";
import express from 'express';
import bodyParser from 'body-parser';
import { DBSource, RedisSource } from './config/dataSource'
import router from './router';
import { errorResult } from "./models/apiResult";

RedisSource.connect();
//监听Redis连接
RedisSource.on('connect', () => {
  console.log("Redis已连接");
});
//监听Redis错误
RedisSource.on('error', (err: any) => {
  console.error("Redis发生错误：", err)
});

//初始化数据库
DBSource.initialize().then(() => {
  console.log("数据库初始化完成");
  // 数据库初始化完成后再启动WEB服务
  let port = Number(process.env.TMS_PORT) || 3000; // 填写端口号
  const app = express();

  app.use(bodyParser.urlencoded({ extended: true }));

  app.use('/', router);

  // 添加错误处理机制
  const clientErrorHandler = (err: any, request: express.Request, response: express.Response, next: Function) => {
    errorResult(response, "系统异常", err.stack);
  }

  app.use(clientErrorHandler)

  app.listen(port, () => {
    console.log(`程序启动，端口：${port}`);
  });
}).catch((error) => {
  console.error("数据库发生错误：", error);
})