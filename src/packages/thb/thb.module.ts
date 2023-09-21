import { Module } from '@nestjs/common';
import { THBController } from "./thb.controller"
import { THBService } from './thb.services';
import { ThbAlbumsEntity, ThbSongsEntity, VThbSongsEntity } from './entities';
import { TypeOrmModule } from '@nestjs/typeorm'

@Module({
    imports: [
        TypeOrmModule.forFeature([ThbAlbumsEntity, ThbSongsEntity, VThbSongsEntity])
    ],
    controllers: [THBController],
    providers: [THBService],
})
export class THBModule { }
