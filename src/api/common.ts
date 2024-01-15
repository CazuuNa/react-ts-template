import { axios } from '@/utils/index';

const test = () => {
    return axios({
        url: '/playlist/catlist',
        method: 'GET',
    });
};

//搜索建议（包含单曲，歌手，歌单）
const getSearchSuggest = (keywords:string) => {
    return axios({
        url: `/search/suggest?keywords=${keywords}`,
        method: 'GET',
    })
}

//banner图获取
const getBanner = () => {
    return axios({
        url: '/banner',
        method: 'GET',
    });
};

//获取推荐歌单
const getPersonalized = () => {
    return axios({
        url: '/personalized?limit=10',
        method: 'GET',
    });
}

//歌单详情
const getPlayListDetail = (id:number | string) => {
    return axios({
        url: `/playlist/detail`,
        method: 'POST',
        data:{
            id
        }
    });
}

export { test, getSearchSuggest,getBanner,getPersonalized,getPlayListDetail };
