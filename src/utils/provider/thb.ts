import got from "got";
const THBTrackAPI = 'https://thwiki.cc/rest/asktrack/v0';

/**
 * THB搜索专辑
 * @param albumName 专辑名关键字
 * @returns 
 */
export const searchAlbum = async (albumName: string) => {
    const pData = {
        alname: null,
        alsearchkey: [albumName],
        circle: null,
        circlename: null,
        date: null,
        eventname: null,
        number: null,
        cover: null,
        coverchar: null,
        only: null
    }
    let res: any = await got.post(`${THBTrackAPI}/query?mode=album`, {
        json: pData
    }).json();
    return res.results;
}

/**
 * THB查询专辑详情
 * @param albumName 专辑词条名
 * @returns 
 */
export const getAlbumDetail = async (albumName: string) => {
    const pData = {
        alname: null,
        album: [albumName],
        circle: null,
        circlename: null,
        date: null,
        eventname: null,
        number: null,
        cover: null,
        coverchar: null,
        only: null
    }
    let res: any = await got.post(`${THBTrackAPI}/query?mode=album`, {
        json: pData
    }).json();
    return res.results;
}

/**
 * THB获得专辑下曲目信息
 * @param albumName 专辑词条名
 * @returns 
 */
export const getAlbumSongs = async (albumName: string) => {
    const pData = {
        album: [albumName],
        name: [],
        ogmusic: null,
        ogmusicname: null,
        ogmusiccnname: null,
        discno: null,
        trackno: null,
        lyrics: null,
    }
    let res: any = await got.post(`${THBTrackAPI}/query?mode=track`, {
        json: pData
    }).json();
    return res.results;
}