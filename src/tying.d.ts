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

    //歌单作者信息
    type CreatorInfo = {
        userId?:number;//用户id
        userType?:number;//用户类型
        vipType?:number;//用户VIP等级
        nickname?:string;//用户昵称
        avatarUrl?:string;//用户头像
    }
    //歌单信息
    type PlayListDetail = {
        id?:number;//歌单id
        coverImgUrl?:string;//图片
        name?:string;//歌单名字
        tags?:Array<string>;//歌单标签
        playCount?:number;//歌单播放量
        shareCount?:number;//歌单分享量
        description?:string;//歌单简介
        trackCount?:number;//歌曲数量
        createTime?:number;//创建时间
        creator?:CreatorInfo
    }
}