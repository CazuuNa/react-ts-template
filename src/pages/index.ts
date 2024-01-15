// 路由懒加载
import { lazy } from 'react';

const Home = lazy(() => import('./home'));
const Discover = lazy(() => import('./home-childer/discover'));
const SongList = lazy(() => import('./home-childer/song-list'));
const PlayListDetail = lazy(() => import('./play-list-detail'));
const Login = lazy(() => import('./login'));

export { Home,Discover,SongList,PlayListDetail,Login };
