import { AppDataSource } from '../config/dataSource'
import { ThbAlbums } from '../entities/ThbAlbums';
import { ThbSongs } from '../entities/ThbSongs';
import { getTHBAlbum, getTHBAlbumSongs, searchTHBAlbum } from '../utils/thb';
import { api_thb_albuminfo } from '../models/api_thb_albuminfo';

/**
 * 根据专辑名称从API搜索专辑结果
 * @param {string} albumName 专辑名称
 * @return {*} 
 */
const searchAlbumListByAPI = async (albumName: string) => {
    const res = await searchTHBAlbum(albumName);
    if (res.length > 0) {
        let list: ThbAlbums[] = res.map((info: any) => {
            let album = new ThbAlbums();
            album.label = info.self.fulltext;
            album.albumName = info.alname.join();
            let circleName = info.circlename.join("/");
            if(!circleName)
            {
                circleName = info.circle.map((c:any)=>{
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
const getAlbumInfoByAPI = async (labelName: string) => {
    let ret = new api_thb_albuminfo();
    const res = await getTHBAlbum(labelName);
    if (res.length > 0) {
        let info = res[0];
        let album = new ThbAlbums();
        album.label = info.self.fulltext;
        album.albumName = info.alname.join();
        let circleName = info.circlename.join("/");
        if(!circleName)
        {
            circleName = info.circle.map((c:any)=>{
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
        let songList = await getAlbumSongByAPI(labelName);
        ret.albumInfo = album;
        ret.songList = songList;
        return ret;
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
const getAlbumSongByAPI = async (labelName: string) => {
    let ret = new api_thb_albuminfo();
    const res = await getTHBAlbumSongs(labelName);
    if (res.length > 0) {
        let list: ThbSongs[] = res.map((info: any) => {
            let song = new ThbSongs();
            song.albumLabel = info.album[0].fulltext;
            let songInfo = info.self.fulltext;
            let songIndex = Number(songInfo.replace(song.albumLabel + "#",""));
            song.songIndex = songIndex;
            song.songName = info.name.join();
            song.discNo =  Number(info.discno.join());
            song.trackNo = Number(info.trackno.join());
            let ogmusicCNName = info.ogmusiccnname.join("/");
            if(!ogmusicCNName)
            {
                ogmusicCNName = info.ogmusic.map((o:any)=>{
                    return o.displaytitle || o.fulltext;
                }).join("/");
            }
            song.ogMusicCnName = ogmusicCNName;
            song.ogMusicName = info.ogmusicname.join("/");
            return song;
        });
        list.sort((a,b)=>{
            return a.songIndex - b.songIndex;
        })
        return list;
    }
    else {
        return [];
    }
}

/**
 * 根据词条名称从数据库获得专辑精确结果
 * @param {string} labelName 专辑词条名称
 * @return {*} 
 */
const getAlbumInfoByDB = async (labelName: string) => {
    const repository = AppDataSource.getRepository(ThbAlbums);
    let info = await repository.findOne({ where: { label: labelName } });
    return info;
}

export {
    searchAlbumListByAPI, 
    getAlbumInfoByAPI,
    getAlbumInfoByDB,
}