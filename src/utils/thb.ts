import got from "got";
const THBTrackAPI = 'https://thwiki.cc/rest/asktrack/v0';

const searchTHBAlbum = async (albumName: string) => {
    const pData = {
        alname: null,
        alsearchkey: [albumName],
        circle:null,
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

const getTHBAlbum = async (albumName: string) => {
    const pData = {
        alname: null,
        album: [albumName],
        circle:null,
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

const getTHBAlbumSongs = async (albumName: string) => {
    const pData = {
        album: [albumName],
        name: [],
        ogmusic: null,
        ogmusicname:null,
        ogmusiccnname:null,
        discno:null,
        trackno:null,
        lyrics:null,
    }
    let res: any = await got.post(`${THBTrackAPI}/query?mode=track`, {
        json: pData
    }).json();
    return res.results;
}

export {
    searchTHBAlbum,
    getTHBAlbum,
    getTHBAlbumSongs
}