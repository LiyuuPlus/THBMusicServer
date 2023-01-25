import { Column, Entity, Index } from "typeorm";

@Index("albumId", ["id"], {})
@Entity("netease_albums", { schema: "thbmusic" })
export class NeteaseAlbums {
  @Column("int", { primary: true, name: "id", comment: "网易云专辑Id" })
  id: number;

  @Column("varchar", {
    name: "albumName",
    nullable: true,
    comment: "专辑名称",
    length: 255,
  })
  albumName: string | null;

  @Column("datetime", {
    name: "updateTime",
    nullable: true,
    comment: "最后更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;
}
