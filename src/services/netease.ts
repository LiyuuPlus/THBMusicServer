import { DBSource } from '../config/dataSource';
import { VNeteaseThbsonglink } from '../entities/VNeteaseThbsonglink';
import { NeteaseThbsonglink } from '../entities/NeteaseThbsonglink';
import { getAlbumInfo, getAlbumSongs } from './thb';
import { api_netease_link } from '../models/api_netease_link';
import * as NCMAPI from '../utils/provider/netease';
import * as RedisHelper from '../utils/redisHelper';
import * as Tools from '../utils/tools';

/**
 * 搜索网易云的专辑信息
 * @param keywords 关键词
 * @returns 
 */
export const searchAlbumListByAPI = async (keywords: string) => {
    const res = await NCMAPI.searchAlbum(keywords);
    return res;
}

/**
 * 搜索网易云的曲目信息
 * @param keywords 关键词
 * @returns 
 */
export const searchSongsByAPI = async (keywords: string) => {
    const res = await NCMAPI.searchSong(keywords);
    return res;
}

/**
 * 查询网易云的曲目信息
 * @param songId 曲目ID
 * @returns 
 */
export const getSongInfoByAPI = async (songId: number) => {
    const res = await NCMAPI.getSongDetail(songId);
    return res;
}

/**
 * 查询网易云曲目关联的THB信息
 * @param songId 曲目ID
 * @returns 
 */
export const getSongInfoByTHB = async (songId: number, isUpdate: boolean = false) => {
    let cacheName = `NeteaseTHB_${songId}`;
    let newInfo = await RedisHelper.getAsync<VNeteaseThbsonglink | null>(cacheName, async () => {
        const repository = DBSource.getRepository(VNeteaseThbsonglink);
        let info = await repository.findOne({ where: { id: songId } });
        if (info) {
            //处理指定字段内容
            if (info.lyrics) {
                info.lyricInfo = Tools.generateLyricUrl(info.lyrics, info.lyricsIndex);
            }
            else {
                info.lyricInfo = null;
            }
        }
        return info;
    }, undefined, isUpdate);
    return newInfo;
}

export const linkSongToTHB = async (songs: api_netease_link[]) => {
    return true;
}