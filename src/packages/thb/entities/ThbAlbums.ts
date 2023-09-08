import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("label", ["label"], {})
@Entity("thb_albums", { schema: "thbmusic" })
export class ThbAlbums {
  @PrimaryGeneratedColumn({ type: "int", name: "id", comment: "THB专辑表Id" })
  id: number;

  @Column("varchar", { name: "label", comment: "词条名", length: 255 })
  label: string;

  @Column("varchar", { name: "albumName", comment: "专辑名", length: 255 })
  albumName: string;

  @Column("varchar", {
    name: "circleName",
    nullable: true,
    comment: "制作社团名称",
    length: 255,
  })
  circleName: string | null;

  @Column("datetime", { name: "date", nullable: true, comment: "首发时间" })
  date: Date | null;

  @Column("varchar", {
    name: "eventName",
    nullable: true,
    comment: "首发展会名称",
    length: 255,
  })
  eventName: string | null;

  @Column("varchar", {
    name: "number",
    nullable: true,
    comment: "专辑编号",
    length: 255,
  })
  number: string | null;

  @Column("varchar", {
    name: "coverUrl",
    nullable: true,
    comment: "封面地址",
    length: 5000,
  })
  coverUrl: string | null;

  @Column("varchar", {
    name: "coverChar",
    nullable: true,
    comment: "封面角色",
    length: 5000,
  })
  coverChar: string | null;

  @Column("varchar", {
    name: "only",
    nullable: true,
    comment: "题材限定",
    length: 2000,
  })
  only: string | null;

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
