declare module "*.svg"


declare namespace API {
    //歌手信息
    type Artist = {
        id:number;
        name:string;
        picUrl:string;
        musicSize?: number; //歌曲数量
        albumSize?: number; // 专辑数量
        mvSize?: number; // mv 数量
        briefDesc?: string; // 简单描述
    }
    //专辑信息
    type Album = {
        id: number;
        name: string;
        picUrl: string;
        size: 2; // un-know
        publishTime: number;
        artist: Artist;
        description: string;
    }
    //歌曲信息
    type Song = {
        id: number;
        name: string; // 歌曲名
        dt?: number; // 时长
        // 歌手列表
        ar?: Array<Artist>;
        artists?: Array<Artist>;
        // 专辑信息
        al?: Album;
        album?: Album;
    }
}