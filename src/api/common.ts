import { axios } from '@/utils/index';

const test = () => {
    return axios({
        url: '/playlist/catlist',
        method: 'GET',
    });
};

const getBanner = () => {
    return axios({
        url: '/banner',
        method: 'GET',
    });
};

export { test, getBanner };
