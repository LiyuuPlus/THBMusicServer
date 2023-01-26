import got from "got";
const THBTrackAPI = 'https://thwiki.cc/rest/asktrack/v0';

const searchTHBAlbum = async (albumName: string) => {
    const pData = {
        alname: [albumName],
        circlename: null,
        // name: [],
        // ogmusicname: null,
        // ogmusiccnname: null,
        // vocal: null,
        // arrange: null,
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

export {
    searchTHBAlbum
}