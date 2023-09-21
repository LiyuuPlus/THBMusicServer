import { Module } from '@nestjs/common';
import { configInit, dbInit, cacheInit } from './config';
import { THBModule, NeteaseModule } from './packages';
import { AppController } from './app.controller';

@Module({
  imports: [
    configInit,
    dbInit,
    cacheInit,
    THBModule,
    NeteaseModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
