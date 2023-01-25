import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("netease_songartistlink", { schema: "thbmusic" })
export class NeteaseSongartistlink {
  @PrimaryGeneratedColumn({
    type: "int",
    name: "id",
    comment: "网易云曲目_歌手关联表Id",
  })
  id: number;

  @Column("int", { name: "songId", comment: "曲目Id" })
  songId: number;

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
