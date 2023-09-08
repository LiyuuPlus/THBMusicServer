import { DBSource } from '../../../config/dataSource';
import { ThbAlbums } from '../entities/ThbAlbums';
import { ThbSongs } from '../entities/ThbSongs';
import * as THBAPI from '../provider/thb';
import * as RedisHelper from '../../../utils/redisHelper';
import * as Tools from '../../../utils/tools';

/** API */

/**
 * 根据专辑名称从API搜索专辑结果
 * @param {string} albumName 专辑名称
 * @return {*} 
 */
export const searchAlbumListByAPI = async (albumName: string) => {
    const res = await THBAPI.searchAlbum(albumName);
    if (res.length > 0) {
        let list: ThbAlbums[] = res.map((info: any) => {
            let album = new ThbAlbums();
            album.label = info.self.fulltext;
            album.albumName = info.alname.join();
            let circleName = info.circlename.join("/");
            if (!circleName) {
                circleName = info.circle.map((c: any) => {
                    return c.displaytitle || c.fulltext;
                }).join("/");
            }
            album.circleName = circleName;
            let date = info.date.length > 0 ? new Date(info.date[0] * 1000) : null;
            album.date = date;
            album.eventName = info.eventname.join();
            album.number = info.number.join();
            album.coverUrl = info.cover.map((v: any) => v.fullurl).join();
            album.coverChar = info.coverchar.map((v: any) => v.fulltext).join(",");
            album.only = info.only.join(",");
            return album;
        });
        return list;
    }
    else {
        return [];
    }
}

/**
 * 根据词条名称从API获得专辑精确结果
 * @param {string} labelName 专辑词条名称
 * @return {*} 
 */
export const getAlbumInfoByAPI = async (labelName: string) => {
    const res = await THBAPI.getAlbumDetail(labelName);
    if (res.length > 0) {
        let info = res[0];
        let album = new ThbAlbums();
        album.label = info.self.fulltext;
        album.albumName = info.alname.join();
        let circleName = info.circlename.join("/");
        if (!circleName) {
            circleName = info.circle.map((c: any) => {
                return c.displaytitle || c.fulltext;
            }).join("/");
        }
        album.circleName = circleName;
        let date = info.date.length > 0 ? new Date(info.date[0] * 1000) : null;
        album.date = date;
        album.eventName = info.eventname.join();
        album.number = info.number.join();
        album.coverUrl = info.cover.map((v: any) => v.fullurl).join();
        album.coverChar = info.coverchar.map((v: any) => v.fulltext).join(",");
        album.only = info.only.join(",");
        return album;
    }
    else {
        return null;
    }
}

/**
 * 根据词条名称从API获得专辑下的曲目结果
 * @param {string} labelName 专辑词条名称
 * @return {*} 
 */
export const getAlbumSongsByAPI = async (labelName: string) => {
    const res = await THBAPI.getAlbumSongs(labelName);
    if (res.length > 0) {
        let list: ThbSongs[] = res.map((info: any) => {
            let song = new ThbSongs();
            song.albumLabel = info.album[0].fulltext;
            let songInfo = info.self.fulltext;
            let songIndex = Number(songInfo.replace(song.albumLabel + "#", ""));
            song.songIndex = songIndex;
            song.songName = info.name.join();
            song.discNo = Number(info.discno.join());
            song.trackNo = Number(info.trackno.join());
            let ogmusicCNName = info.ogmusiccnname.join("/");
            if (!ogmusicCNName) {
                ogmusicCNName = info.ogmusic.map((o: any) => {
                    return o.displaytitle || o.fulltext;
                }).join("/");
            }
            song.ogMusicCnName = ogmusicCNName;
            song.ogMusicName = info.ogmusicname.join("/");
            let lyrics = info.lyrics[0];
            if (lyrics) {
                lyrics = lyrics.exists ? lyrics.fulltext : "";
            }
            song.lyrics = lyrics;
            if (lyrics) {
                song.lyricsIndex = 1;
            }
            return song;
        });
        list.sort((a, b) => {
            return a.songIndex - b.songIndex;
        })
        return list;
    }
    else {
        return [];
    }
}

/** 数据库 */

/**
 * 根据词条名称从数据库获得专辑精确结果
 * @param {string} labelName 专辑词条名称
 * @return {*} 
 */
export const getAlbumInfoByDB = async (labelName: string) => {
    const repository = DBSource.getRepository(ThbAlbums);
    let info = await repository.findOne({ where: { label: labelName, isDel: 0 } });
    return info;
}

/**
 * 根据词条名称从数据库获得专辑下的曲目结果
 * @param {string} labelName 专辑词条名称
 * @return {*} 
 */
export const getAlbumSongsByDB = async (labelName: string) => {
    const repository = DBSource.getRepository(ThbSongs);
    let list = await repository.find({ where: { albumLabel: labelName, isDel: 0 } });
    list.sort((a, b) => {
        return a.songIndex - b.songIndex;
    })
    return list;
}

/** 聚合结果 */

/**
 * 根据词条名称获得专辑精确结果
 * @param {string} labelName 专辑词条名称
 * @return {*} 
 */
export const getAlbumInfo = async (labelName: string, isUpdate: boolean = false) => {
    let cacheName = `THBAlbum_${labelName}`;
    let newInfo = await RedisHelper.getAsync<ThbAlbums | null>(cacheName, async () => {
        //先看看数据库里有没有，没有再去API查找
        let info = await getAlbumInfoByDB(labelName);
        if (isUpdate || !info) {
            let newInfo = await getAlbumInfoByAPI(labelName);
            if (newInfo) {
                if (!info) {
                    info = newInfo;
                }
                else {
                    info.albumName = newInfo.albumName;
                    info.circleName = newInfo.circleName;
                    info.date = newInfo.date;
                    info.eventName = newInfo.eventName;
                    info.number = newInfo.number;
                    info.coverUrl = newInfo.coverUrl;
                    info.coverChar = newInfo.coverChar;
                    info.only = newInfo.only;
                    info.updateTime = new Date();
                }
                //这里保存已有的新列表
                const repository = DBSource.getRepository(ThbAlbums);
                await repository.save(info);
            }
        }
        if (info) {
            //指定字段不返回
            // Reflect.deleteProperty(info, "id");
            Reflect.deleteProperty(info, "isDel");
        }
        return info;
    }, undefined, isUpdate);
    return newInfo;
}

/**
 * 根据词条名称获得专辑下的曲目结果
 * @param {string} labelName 专辑词条名称
 * @return {*} 
 */
export const getAlbumSongs = async (labelName: string, isUpdate: boolean = false) => {
    let cacheName = `THBSongs_${labelName}`;
    let newList = await RedisHelper.getAsync<ThbSongs[]>(cacheName, async () => {
        //先看看数据库里有没有，没有再去API查找
        let list = await getAlbumSongsByDB(labelName);
        if (isUpdate || list.length <= 0) {
            let newList = await getAlbumSongsByAPI(labelName);
            if (list.length <= 0) {
                list = newList;
            }
            else {
                list = list.map(v => {
                    let items = newList.filter(v1 => v.songName == v1.songName);
                    //更新字段
                    if (items.length > 0) {
                        let item = items[0];
                        v.songIndex = item.songIndex;
                        v.discNo = item.discNo;
                        v.trackNo = item.trackNo;
                        v.ogMusicName = item.ogMusicName;
                        v.ogMusicCnName = item.ogMusicCnName;
                        if (v.lyrics != item.lyrics) {
                            v.lyrics = item.lyrics;
                            v.lyricsIndex = 1;
                        }
                        v.updateTime = new Date();
                    }
                    else {
                        //标记删除
                        v.isDel = 1;
                    }
                    return v;
                });
                //抽取出新增的，并加入更新实体集
                let oldListName = list.filter(v => v.isDel == 0).map(v => v.songName);
                let addList = newList.filter(v => !oldListName.includes(v.songName));
                list.push(...addList);
            }
            //这里保存已有的新列表
            const repository = DBSource.getRepository(ThbSongs);
            await repository.save(list);
        }
        for (var i = 0; i < list.length; i++) {
            let item = list[i];
            //指定字段不返回
            // Reflect.deleteProperty(item, "id");
            // Reflect.deleteProperty(item, "albumLabel");
            Reflect.deleteProperty(item, "isDel");
            //处理指定字段内容
            let lyricUrl = "", transLyricUrl = "", allLyricUrl = "";
            if (item.lyrics) {
                const lyricObj = Tools.generateLyricUrl(item.lyrics, item.lyricsIndex);
                lyricUrl = lyricObj.lyricUrl;
                transLyricUrl = lyricObj.transLyricUrl;
                allLyricUrl = lyricObj.allLyricUrl;
            }
            item.lyricUrl = lyricUrl;
            item.transLyricUrl = transLyricUrl;
            item.allLyricUrl = allLyricUrl;
        }
        return list;
    }, undefined, isUpdate);
    return newList;
}