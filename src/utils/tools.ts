/**
 * 生成三种歌词链接
 * @param lyricLabel 歌词词条 
 * @param lyricIndex 歌词编号
 */
export const generateLyricUrl = (lyricLabel: string, lyricIndex: number | null = 1) => {
    const thbLyricSite = "https://lyrics.thwiki.cc/";
    let lyricName = lyricLabel.replace("歌词:", "");
    const lyricObj = {
        lyricUrl: encodeURI(`${thbLyricSite}${lyricName}.${lyricIndex}.ja.lrc`),
        transLyricUrl: encodeURI(`${thbLyricSite}${lyricName}.${lyricIndex}.zh.lrc`),
        allLyricUrl: encodeURI(`${thbLyricSite}${lyricName}.${lyricIndex}.all.lrc`),
    }
    return lyricObj;
}