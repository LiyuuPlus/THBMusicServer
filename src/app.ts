import "reflect-metadata";
import "module-alias/register";
import express from 'express';
import bodyParser from 'body-parser';
import { createConnection } from 'typeorm';
import router from './router'; 

let port = 3000; // 填写端口号

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/', router);

app.listen(port, () => {
  console.log(`Application has started on Port ${port}`);
});