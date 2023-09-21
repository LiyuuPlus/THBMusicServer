import { Get, Post, Body, Put, Delete, Query, Param, Controller, ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { ApiParam, ApiOkResponse, ApiOperation, ApiTags, getSchemaPath } from '@nestjs/swagger';

import { successResult } from '../../dto/apiResponse';

import { THBService } from './thb.services';

import { AlbumsResult, AlbumInfoResult, AlbumInfo } from './dto';

@Controller("thb")
@ApiTags('THBWiki')
@UseInterceptors(ClassSerializerInterceptor)
export class THBController {
    constructor(private thbService: THBService) { }

    @ApiOperation({ summary: '根据关键词在线搜索专辑信息' })
    @ApiParam({ name: "name", required: true, description: "专辑搜索关键字" })
    @ApiOkResponse({ description: '返回从THBWiki搜索的结果', type: AlbumsResult })
    @Get("/search/album/:name")
    async searchAlbum(@Param("name") name: string) {
        let list = await this.thbService.searchAlbumListByAPI(name);
        return successResult("查询成功", list);
    }

}
