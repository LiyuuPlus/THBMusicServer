import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  root(): string {
    return "东方音乐信息查询服务";
  }
}
