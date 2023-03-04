import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    expression: `
	SELECT
	v_netease_songs.id AS id,
	v_thb_songs.id AS thbid,
	v_netease_songs.songName AS songName,
	v_thb_songs.songName AS THBSongName,
	v_netease_songs.albumName AS albumName,
	v_thb_songs.albumName AS THBAlbumName,
	v_thb_songs.discNo AS discNo,
	v_thb_songs.trackNo AS trackNo,
	v_thb_songs.ogMusicName AS ogMusicName,
	v_thb_songs.ogMusicCnName AS ogMusicCnName,
	v_thb_songs.lyrics AS lyrics,
	v_thb_songs.lyricsIndex AS lyricsIndex,
	v_thb_songs.CircleName AS CircleName,
	v_thb_songs.date AS Date,
	v_thb_songs.eventName AS eventName,
	v_thb_songs.number AS number,
	v_thb_songs.coverUrl AS coverUrl,
	v_thb_songs.coverChar AS coverChar,
	v_thb_songs.only AS only,
	v_thb_songs.updateTime AS updateTime 
FROM
	v_netease_songs
	JOIN netease_thbsonglink ON v_netease_songs.id = netease_thbsonglink.songId AND netease_thbsonglink.isDel = 0
	JOIN v_thb_songs ON netease_thbsonglink.albumLabel = v_thb_songs.albumLabel 
	AND netease_thbsonglink.songIndex = v_thb_songs.songIndex
    `
})

export class VNeteaseThbsonglink {

    @ViewColumn()
    id: number | null;

    @ViewColumn()
    thbid: string | null;

    @ViewColumn()
    songName: string | null;

    @ViewColumn()
    THBSongName: string | null;

    @ViewColumn()
    albumName: string | null;

    @ViewColumn()
    THBAlbumName: string | null;

    @ViewColumn()
    discNo: number | null;

    @ViewColumn()
    trackNo: number | null;

    @ViewColumn()
    ogMusicName: string | null;

    @ViewColumn()
    ogMusicCnName: string | null;

    @ViewColumn()
    lyrics: string | null;

    @ViewColumn()
    lyricsIndex: number | null;

    @ViewColumn()
    CircleName: string | null;

    @ViewColumn()
    Date: Date | null;

    @ViewColumn()
    eventName: string | null;

    @ViewColumn()
    number: string | null;

    @ViewColumn()
    coverUrl: string | null;

    @ViewColumn()
    coverChar: string | null;

    @ViewColumn()
    only: string | null;

    @ViewColumn()
    updateTime: Date | null;

}