import { Column, Entity, Index } from "typeorm";

@Index("songId_albumId", ["id", "albumId"], {})
@Entity("netease_songs", { schema: "thbmusic" })
export class NeteaseSongs {
  @Column("int", { primary: true, name: "id", comment: "网易云曲目Id" })
  id: number;

  @Column("int", { name: "songIndex", comment: "曲目序号" })
  songIndex: number;

  @Column("varchar", {
    name: "songName",
    nullable: true,
    comment: "曲目名称",
    length: 255,
  })
  songName: string | null;

  @Column("int", { name: "albumId", comment: "专辑Id" })
  albumId: number;

  @Column("datetime", {
    name: "updateTime",
    nullable: true,
    comment: "最后更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;
}
