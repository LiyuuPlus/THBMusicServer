import { DBSource } from '../config/dataSource'
import { VNeteaseSongs } from '../entities/VNeteaseSongs';
import { VNeteaseThbsonglink } from '../entities/VNeteaseThbsonglink';
import * as NCMAPI from '../utils/provider/netease'

/**
 * 查询网易云的曲目信息
 * @param songId 曲目ID
 * @returns 
 */
export const getSongInfo = async (songId: number) => {
    const repository = DBSource.getRepository(VNeteaseSongs);
    let info = await repository.findOne({ where: { id: songId } });
    return info;
}

/**
 * 查询网易云曲目关联的THB信息
 * @param songId 曲目ID
 * @returns 
 */
export const getSongInfoByTHB = async (songId: number) => {
    const repository = DBSource.getRepository(VNeteaseThbsonglink);
    let info = await repository.findOne({ where: { id: songId } });
    return info;
}