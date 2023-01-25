import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    expression: `
    SELECT
	aal.albumId AS albumId,
	na.albumName AS albumName,
	group_concat( aal.artistId SEPARATOR '／' ) AS artistId,
	group_concat( nar.artistName SEPARATOR '／' ) AS artistName 
FROM
	((
			netease_albumartistlink aal
			JOIN netease_albums na ON ((
					aal.albumId = na.id 
				)))
		JOIN netease_artists nar ON ((
				aal.artistId = nar.id 
			))) 
GROUP BY
	aal.albumId,
	na.albumName
    `
})

export class VNeteaseAlbumslink {

    @ViewColumn()
    albumId: string | null;

    @ViewColumn()
    albumName: string | null;

    @ViewColumn()
    artistId: string | null;

    @ViewColumn()
    artistName: string | null;

}