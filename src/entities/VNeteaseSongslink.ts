import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    expression: `
	SELECT
	sal.songId AS songId,
	ns.songName AS songName,
	group_concat( sal.artistId SEPARATOR '／' ) AS artistId,
	group_concat( na.artistName SEPARATOR '／' ) AS artistName 
FROM
	netease_songartistlink sal
	JOIN netease_songs ns ON sal.songId = ns.id
	JOIN netease_artists na ON sal.artistId = na.id 
GROUP BY
	sal.songId,
	ns.songName
    `
})

export class VNeteaseSongslink {

    @ViewColumn()
    songId: number | null;

    @ViewColumn()
    songName: string | null;

    @ViewColumn()
    artistId: string | null;

    @ViewColumn()
    artistName: string | null;
}