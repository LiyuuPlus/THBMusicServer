import { AppDataSource } from '../config/dataSource'
import { VNeteaseSongs } from '../entities/VNeteaseSongs';
import { VNeteaseThbsonglink } from '../entities/VNeteaseThbsonglink';

/**
 * 查询网易云的曲目信息
 * @param songId 曲目ID
 * @returns 
 */
const getMusicInfoBySongId = async (songId: number) => {
    const repository = AppDataSource.getRepository(VNeteaseSongs);
    let info = await repository.findOne({ where: { id: songId } });
    return info;
}

/**
 * 查询网易云曲目关联的THB信息
 * @param songId 曲目ID
 * @returns 
 */
const getTHBInfoBySongId = async (songId: number) => {
    const repository = AppDataSource.getRepository(VNeteaseThbsonglink);
    let info = await repository.findOne({ where: { id: songId } });
    return info;
}

export {
    getMusicInfoBySongId,
    getTHBInfoBySongId
}