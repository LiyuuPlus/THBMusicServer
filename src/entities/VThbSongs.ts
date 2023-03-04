import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    expression: `
    SELECT
	concat( ts.albumLabel, '#', ts.songIndex ) AS id,
	ts.albumLabel AS albumLabel,
	ts.songIndex AS songIndex,
	ta.albumName AS albumName,
	ts.songName AS songName,
	ts.discNo AS discNo,
	ts.trackNo AS trackNo,
	ts.ogMusicName AS ogMusicName,
	ts.ogMusicCnName AS ogMusicCnName,
	ts.lyrics AS lyrics,
	ts.lyricsIndex AS lyricsIndex,
	ta.circleName AS circleName,
	ta.date AS date,
	ta.eventName AS eventName,
	ta.number AS number,
	ta.coverUrl AS coverUrl,
	ta.coverChar AS coverChar,
	ta.only AS only,
	ts.updateTime AS updateTime 
FROM
	thb_songs ts
	JOIN thb_albums ta ON ts.albumLabel = ta.label 
	AND ta.isDel = 0 
WHERE
	ts.isDel = 0
    `
})

export class VThbSongs {

    @ViewColumn()
    id: string;

    @ViewColumn()
    albumLabel: string | null;

    @ViewColumn()
    songIndex: number | null;

    @ViewColumn()
    albumName: string | null;

    @ViewColumn()
    songName: string | null;

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
    circleName: string | null;

    @ViewColumn()
    date: Date | null;

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