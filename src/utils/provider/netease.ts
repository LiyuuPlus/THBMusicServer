import got from "got";
const NeteaseAPI = process.env.NCMAPI || "";

export const searchAlbum = async (name: string, limit: number = 30, offset: number = 0) => {
    const pData = {
        keywords: name,
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

export const searchSong = async (name: string, limit: number = 30, offset: number = 0) => {
    const pData = {
        keywords: name,
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