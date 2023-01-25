import { ViewEntity, ViewColumn } from "typeorm";

@ViewEntity({
    expression: `
	SELECT
	ns.id AS id,
	ns.songIndex AS songIndex,
	ns.songName AS songName,
	ns.albumId AS albumId,
	na.albumName AS albumName,
	vnsl.artistId AS artistId,
	vnsl.artistName AS artistName,
	ns.updateTime AS updateTime 
FROM
	((
			netease_songs ns
			JOIN netease_albums na ON ((
					ns.albumId = na.id 
				)))
		JOIN v_netease_songslink vnsl ON ((
			ns.id = vnsl.songId 
	)))
    `
})

export class VNeteaseSongs {

    @ViewColumn()
    id: number;

    @ViewColumn()
    songIndex: number;

    @ViewColumn()
    songName: string | null;

    @ViewColumn()
    albumId: number | null;

    @ViewColumn()
    albumName: string | null;

    @ViewColumn()
    artistId: string | null;

    @ViewColumn()
    artistName: string | null;

    @ViewColumn()
    updateTime: Date | null;

}