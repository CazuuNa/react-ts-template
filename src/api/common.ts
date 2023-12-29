import { axios } from '@/utils/index';

const test = () => {
    return axios({
        url: '/playlist/catlist',
        method: 'GET',
    });
};

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
        url: `/playlist/detail?id=${id}`,
        method: 'GET',
    });
}

export { test, getBanner,getPersonalized,getPlayListDetail };
