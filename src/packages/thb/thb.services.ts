import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as THBAPI from '../../providers/thbwiki'

import { ThbAlbumsEntity, ThbSongsEntity, VThbSongsEntity } from './entities';

@Injectable()
export class THBService {
    constructor(
        @InjectRepository(ThbAlbumsEntity)
        private readonly albumRepository: Repository<ThbAlbumsEntity>,
        @InjectRepository(ThbSongsEntity)
        private readonly songRepository: Repository<ThbSongsEntity>,
        @InjectRepository(VThbSongsEntity)
        private readonly vSongRepository: Repository<VThbSongsEntity>,
    ) { }

    /**
     * 根据专辑名称从API搜索专辑结果
     * @param alsearchkey 专辑名称
     * @returns 
     */
    async searchAlbumListByAPI(alsearchkey: string): Promise<ThbAlbumsEntity[]> {
        const res = await THBAPI.searchAlbum(alsearchkey);
        if (res.length > 0) {
            let list: ThbAlbumsEntity[] = res.map((info: any) => {
                let album = new ThbAlbumsEntity();
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
                album.updateTime = new Date();
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
    async getAlbumInfoByAPI (labelName: string) {
        const res = await THBAPI.getAlbumDetail(labelName);
        if (res.length > 0) {
            let info = res[0];
            let album = new ThbAlbumsEntity();
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
    async getAlbumSongsByAPI (labelName: string) {
        const res = await THBAPI.getAlbumSongs(labelName);
        if (res.length > 0) {
            let list: ThbSongsEntity[] = res.map((info: any) => {
                let song = new ThbSongsEntity();
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
}