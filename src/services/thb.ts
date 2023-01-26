
import { ThbAlbums } from '../entities/ThbAlbums';
import { searchTHBAlbum } from '../utils/thb';

const getAlbumInfoByAPI = async (albumName: string) => {
    const res = await searchTHBAlbum(albumName);
    if (res.length > 0) {
        let info = res[0];
        let album = new ThbAlbums();
        album.albumName = info.alname.join();
        album.circleName = info.circlename.join("/");
        let date = info.date.length > 0 ? new Date(info.date[0] * 1000) : null;
        album.date = date;
        album.eventName = info.eventname.join();
        album.number = info.number.join();
        album.coverUrl = info.cover.map((v: any) => v.fullurl).join();
        album.coverChar = info.coverchar.map((v: any) => v.fulltext).join(",");
        album.only = info.only.join(",");
        return album;
    }
    else {
        return null;
    }
}

export {
    getAlbumInfoByAPI
}