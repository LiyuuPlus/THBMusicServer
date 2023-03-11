import { Column, Entity } from "typeorm";

@Entity("netease_thbsonglink", { schema: "thbmusic" })
export class NeteaseThbsonglink {
  @Column("int", { primary: true, name: "songId", comment: "网易云曲目Id" })
  songId: number;

  @Column("int", {
    name: "thbSongId",
    comment: "THB曲目记录Id",
  })
  songIndex: number | null;

  @Column("datetime", {
    name: "updateTime",
    nullable: true,
    comment: "最后更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;

  @Column("int", { name: "isDel", comment: "是否删除" })
  isDel: number;
}
