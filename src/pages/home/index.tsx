import React, { useState } from 'react';
import { Outlet,useNavigate } from 'react-router-dom';
import { Layout, Menu, theme, ConfigProvider, Button } from 'antd';
import { routeRender } from '@/router/index';
import './index.less';

const prefixCls = 'home-page';

const HomePage: React.FC = () => {
    const navigateTo = useNavigate()
    const defaultNavMenuList: any[] = [
        {
            title: '个性推荐',
            key: 1,
            path: '',
        },
        // {
        //     title: '专属定制',
        //     key: 2,
        //     component: '',
        // },
        {
            title: '歌单',
            key: 3,
            path: 'songlist',
        },
        // {
        //     title: '排行榜',
        //     key: 4,
        //     component: '',
        // },
        // {
        //     title: '歌手',
        //     key: 5,
        //     component: '',
        // },
        // {
        //     title: '最新音乐',
        //     key: 6,
        //     component: '',
        // },
    ];
    const [navMenuList, setNavMenuList] = useState(defaultNavMenuList);
    const [navActive, setNavActive] = useState(1);

    const changeNav = (nav:any) => {
        console.log(nav);
        setNavActive(nav.key)
        navigateTo(nav.path)
    }
    return (
        <div className={`box ${prefixCls}`}>
            <div className={`${prefixCls}-nav`}>
                {navMenuList.map(nav => {
                    return (
                        <div onClick={() => {changeNav(nav)}} className={`${prefixCls}-nav-item ${navActive == nav.key ? prefixCls + '-nav-item-active' : ''}`} key={nav.key}>
                            {nav.title}
                        </div>
                    );
                })}
            </div>
            <div className={`${prefixCls}-content`}>
                <Outlet />
            </div>
        </div>
    );
};

export default HomePage;
