import { DBSource } from '../../../config/dataSource';
import { In } from 'typeorm';
import { VNeteaseThbsonglink } from '../entities/VNeteaseThbsonglink';
import { NeteaseThbsonglink } from '../entities/NeteaseThbsonglink';
import { api_netease_link } from '../models/api_netease_link';
import * as NCMAPI from '../provider/netease';
import { getAlbumInfo, getAlbumSongs } from '../../thb/services/thb';
import * as RedisHelper from '../../../utils/redisHelper';
import * as Tools from '../../../utils/tools';
import { groupBy, uniqBy } from 'lodash';

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

/**
 * 网易云曲目批量关联THB词条
 * @param songs 曲目数组
 * @returns 
 */
export const linkSongToTHB = async (songs: api_netease_link[]) => {
    let groupSongs = groupBy(songs, "albumLabel");
    let links: NeteaseThbsonglink[] = [];
    let keys = Object.keys(groupSongs);
    for (var i = 0; i < keys.length; i++) {
        let key = keys[i];
        let items = groupSongs[key];
        let album = await getAlbumInfo(key);
        if (album) {
            let songList = await getAlbumSongs(key);
            items.forEach(item => {
                let song = songList.find(s => s.songIndex == item.songIndex);
                if (song) {
                    let link = new NeteaseThbsonglink();
                    link.songId = item.songId;
                    link.thbSongId = song.id;
                    link.isDel = 0;
                    links.push(link);
                }
            })
        }
    }
    const repository = DBSource.getRepository(NeteaseThbsonglink);
    let oldSongIds = links.map(v => v.songId);
    oldSongIds = uniqBy(oldSongIds, v => v);
    let oldThbSongIds = links.map(v => v.thbSongId);
    oldThbSongIds = uniqBy(oldThbSongIds, v => v);
    let oldLinkList = await repository.find({ where: [{ songId: In(oldSongIds), isDel: 0 }, { thbSongId: In(oldThbSongIds), isDel: 0 }] });
    //排除已有关联的数据
    links = links.filter(v => (oldLinkList.findIndex(el => el.songId == v.songId) < 0 && oldLinkList.findIndex(el => el.thbSongId == v.thbSongId) < 0));
    //这里把剩余的部分添加进数据库
    repository.save(links);
    return links;
}

/**
 * 网易云曲目批量解除关联THB词条
 * @param songs 曲目数组
 * @returns 
 */
export const unlinkSongToTHB = async (songs: api_netease_link[]) => {
    let songIds = songs.map(v => v.songId);
    const repository = DBSource.getRepository(NeteaseThbsonglink);
    songIds = uniqBy(songIds, v => v);
    let linkList = await repository.find({ where: [{ songId: In(songIds), isDel: 0 }] });
    linkList = linkList.map(v => {
        v.isDel = 1;
        v.updateTime = new Date();
        return v;
    });
    //这里把已有的部分标记删除
    repository.save(linkList);
    return linkList;
}