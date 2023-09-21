import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { ApiResult } from "../../../dto/apiResponse";
import { ThbAlbumsEntity, ThbSongsEntity, VThbSongsEntity } from '../entities';
import { AlbumInfo } from '.';

export class AlbumsResult extends ApiResult {
    @ApiProperty({
        description: "数据",
        type: ThbAlbumsEntity
    })
    data: ThbAlbumsEntity | null | undefined;
}

export class AlbumInfoResult extends ApiResult {
    @ApiProperty({
        description: "数据",
        type: AlbumInfo
    })
   override data: AlbumInfo | null | undefined;
}