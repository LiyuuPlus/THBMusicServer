import { Module } from '@nestjs/common';
import { configInit, dbInit, cacheInit } from './config';
import { AppController } from './app.controller';

@Module({
  imports: [
    configInit,
    dbInit,
    cacheInit
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule { }
