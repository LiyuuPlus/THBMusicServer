import { Column, Entity } from "typeorm";

@Entity("netease_thbsonglink", { schema: "thbmusic" })
export class NeteaseThbsonglink {
  @Column("int", { primary: true, name: "songId", comment: "网易云Id" })
  songId: number;

  @Column("varchar", {
    name: "albumLabel",
    nullable: true,
    comment: "THB专辑词条名",
    length: 255,
  })
  albumLabel: string | null;

  @Column("varchar", {
    name: "songIndex",
    nullable: true,
    comment: "曲目Id",
    length: 255,
  })
  songIndex: string | null;

  @Column("datetime", {
    name: "updateTime",
    nullable: true,
    comment: "最后更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;
}
