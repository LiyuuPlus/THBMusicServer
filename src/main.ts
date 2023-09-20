import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });
  const configService = app.get(ConfigService)
  let port = Number(configService.get("TMS_PORT")) || 3000; // 填写端口号
  console.log(`程序启动，端口：${port}`);
  await app.listen(port);
}
bootstrap();
