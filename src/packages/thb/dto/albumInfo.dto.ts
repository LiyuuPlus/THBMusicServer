import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';
import { ThbAlbumsEntity, ThbSongsEntity, VThbSongsEntity } from '../entities';

@ApiExtraModels()
export class AlbumInfo {
    @ApiProperty({
        description: "专辑信息",
    })
    albumInfo: ThbAlbumsEntity;

    @ApiProperty({
        description: "曲目信息",
    })
    songList: ThbSongsEntity[];
}