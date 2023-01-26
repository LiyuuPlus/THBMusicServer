import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("albumLabel", ["albumLabel"], {})
@Entity("thb_songs", { schema: "thbmusic" })
export class ThbSongs {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "THB曲目表Id" })
  id: number;

  @Column("varchar", { name: "albumLabel", comment: "所属词条名", length: 255 })
  albumLabel: string;

  @Column("int", { name: "songIndex", comment: "曲目编号" })
  songIndex: number;

  @Column("varchar", {
    name: "songName",
    nullable: true,
    comment: "曲目名称",
    length: 255,
  })
  songName: string | null;

  @Column("int", { name: "discNo", comment: "碟号", default: () => "'1'" })
  discNo: number;

  @Column("int", { name: "trackNo", comment: "曲目号", default: () => "'1'" })
  trackNo: number;

  @Column("varchar", {
    name: "ogMusicName",
    nullable: true,
    comment: "原曲名称",
    length: 5000,
  })
  ogMusicName: string | null;

  @Column("varchar", {
    name: "ogMusicCnName",
    nullable: true,
    comment: "原曲中文名称",
    length: 5000,
  })
  ogMusicCnName: string | null;

  @Column("varchar", {
    name: "lyrics",
    nullable: true,
    comment: "歌词词条名",
    length: 1000,
  })
  lyrics: string | null;

  @Column("int", { name: "lyricsIndex", nullable: true, comment: "歌词编号" })
  lyricsIndex: number | null;

  @Column("datetime", {
    name: "updateTime",
    nullable: true,
    comment: "最后更新时间",
    default: () => "CURRENT_TIMESTAMP",
  })
  updateTime: Date | null;
}
