import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    expression: `
    SELECT
	netease_thbsonglink.songId AS id,
	v_thb_songs.id AS thbid,
	v_thb_songs.songName AS songName,
	v_thb_songs.albumName AS albumName,
	v_thb_songs.discNo AS discNo,
	v_thb_songs.trackNo AS trackNo,
	v_thb_songs.ogMusicName AS ogMusicName,
	v_thb_songs.ogMusicCnName AS ogMusicCnName,
	v_thb_songs.lyrics AS lyrics,
	v_thb_songs.lyricsIndex AS lyricsIndex,
	v_thb_songs.circleName AS CircleName,
	v_thb_songs.DATE AS DATE,
	v_thb_songs.eventName AS eventName,
	v_thb_songs.number AS number,
	v_thb_songs.coverUrl AS coverUrl,
	v_thb_songs.coverChar AS coverChar,
	v_thb_songs.only AS only,
	v_thb_songs.updateTime AS updateTime 
FROM
	netease_thbsonglink
	JOIN v_thb_songs ON netease_thbsonglink.thbSongId = v_thb_songs.oId
WHERE netease_thbsonglink.isDel = 0
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
    albumName: string | null;

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

    // 额外添加
    lyricInfo: {
        lyricUrl: string | null;

        transLyricUrl: string | null;

        allLyricUrl: string | null;
    } | null

}