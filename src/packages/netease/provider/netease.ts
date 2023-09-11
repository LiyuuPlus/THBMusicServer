import got from "got";

const NeteaseAPI = process.env.NCMAPI || "";

/**
 * 网易云搜索专辑
 * @param keywords 关键词
 * @param limit 显示条数（默认30）
 * @param offset 偏移数（页数*显示条数）
 * @returns 
 */
export const searchAlbum = async (keywords: string, limit: number = 30, offset: number = 0) => {
    const pData = {
        keywords: keywords,
        limit: limit,
        offset: offset,
        type: 10
    }
    let res: any = await got.get(`${NeteaseAPI}/search`, {
        searchParams: pData
    }).json();
    if (res.code == 200) {
        return res.result.albums;
    }
    return [];
}

/**
 * 网易云搜索曲子
 * @param keywords 关键词
 * @param limit 显示条数（默认30）
 * @param offset 偏移数（页数*显示条数）
 * @returns 
 */
export const searchSong = async (keywords: string, limit: number = 30, offset: number = 0) => {
    const pData = {
        keywords: keywords,
        limit: limit,
        offset: offset,
        type: 1
    }
    let res: any = await got.get(`${NeteaseAPI}/search`, {
        searchParams: pData
    }).json();
    if (res.code == 200) {
        return res.result.songs;
    }
    return [];
}

/**
 * 网易云获得曲目详情
 * @param songId 曲目ID
 * @returns 
 */
export const getSongDetail = async (songId: number) => {
    const pData = {
        ids: songId
    }
    let res: any = await got.get(`${NeteaseAPI}/song/detail`, {
        searchParams: pData
    }).json();
    if (res.code == 200) {
        if(res.songs.length > 0)
        {
            return res.songs[0];
        }
    }
    return null;
}