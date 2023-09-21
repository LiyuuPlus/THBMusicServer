import { Controller, Get } from '@nestjs/common';
import {ApiExcludeController} from '@nestjs/swagger'

@Controller()
@ApiExcludeController()
export class AppController {

  @Get()
  root(): string {
    return "东方音乐信息查询服务";
  }
}
