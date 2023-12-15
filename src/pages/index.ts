// 路由懒加载
import { lazy } from 'react';

const Home = lazy(() => import('./home'));
const Discover = lazy(() => import('./home-childer/discover'));
const SongList = lazy(() => import('./home-childer/song-list'));

export { Home,Discover,SongList };
