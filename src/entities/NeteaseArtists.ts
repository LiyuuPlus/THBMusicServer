import { Column, Entity } from "typeorm";

@Entity("netease_artists", { schema: "thbmusic" })
export class NeteaseArtists {
  @Column("int", { primary: true, name: "id", comment: "网易云歌手Id" })
  id: number;

  @Column("varchar", { name: "artistName", comment: "歌手名称", length: 255 })
  artistName: string;

  @Column("datetime", {
    name: "updateTime",
    nullable: true,
    comment: "最后更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;
}
