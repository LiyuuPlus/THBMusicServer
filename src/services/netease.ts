import { createConnection } from 'typeorm';
import { VNeteaseSongs } from '../entities/VNeteaseSongs';
import { VNeteaseThbsonglink } from '../entities/VNeteaseThbsonglink';

/**
 * 查询网易云的曲目信息
 * @param songId 曲目ID
 * @returns 
 */
const getMusicInfoBySongId = async (songId: number) => {
    const connection = await createConnection();
    const repository = connection.getRepository(VNeteaseSongs);
    let info = await repository.findOne({ where: { id: songId } });
    connection.close();
    return info;
}

/**
 * 查询网易云曲目关联的THB信息
 * @param songId 曲目ID
 * @returns 
 */
const getTHBInfoBySongId = async (songId: number) => {
    const connection = await createConnection();
    const repository = connection.getRepository(VNeteaseThbsonglink);
    let info = await repository.findOne({ where: { id: songId } });
    connection.close();
    return info;
}

export {
    getMusicInfoBySongId,
    getTHBInfoBySongId
}