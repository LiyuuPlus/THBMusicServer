import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("netease_albumartistlink", { schema: "thbmusic" })
export class NeteaseAlbumartistlink {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "网易云专辑_歌手关联表Id",
  })
  id: number;

  @Column("int", { name: "albumId", comment: "专辑Id" })
  albumId: number;

  @Column("int", { name: "artistId", comment: "歌手Id" })
  artistId: number;

  @Column("datetime", {
    name: "updateTime",
    nullable: true,
    comment: "最后更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;
}
