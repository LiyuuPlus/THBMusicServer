import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { abortOnError: false });

  const docConfig = new DocumentBuilder()
    .setTitle('THBWiki Music Info Server')
    .setDescription('This is THBWiki Music Info Server')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, docConfig);
  SwaggerModule.setup('api', app, document);

  const config = app.get(ConfigService)
  let port = Number(config.get("TMS_PORT")) || 3000; // 填写端口号
  console.log(`程序启动，地址：http://127.0.0.1:${port}`);
  await app.listen(port, "0.0.0.0");
}
bootstrap();
