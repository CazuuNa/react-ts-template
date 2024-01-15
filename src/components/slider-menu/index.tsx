import React, { useState, useEffect, useRef } from 'react';
import { Space } from 'antd';
import './index.less';
import { test } from '@/api/common';
import {useLocation} from 'react-router-dom';

const prefixCls = 'menu-page';

const MenutPage: React.FC = () => {
    
    const defaultMenu:any[] = [
        {
            title:'发现音乐',
            key:1,
            component:'Home'
        },
        {
            title:'播客',
            key:2,
            component:'Home'
        },
        {
            title:'关注',
            key:3,
            component:'Home'
        },
        {
            title:'直播',
            key:4,
            component:'Home'
        },
        {
            title:'私人漫游',
            key:5,
            component:'Home'
        },
        {
            title:'视频',
            key:6,
            component:'Home'
        },
    ]
    const [mainMenuList,setMainMenuList] = useState(defaultMenu)
    const [menuActive,setMenuActive] = useState(1)
    // const isData = useRef(false)
    // useEffect(() => {
    //     console.log(isData);
    //     if (!isData.current) {
    //         isData.current = true
    //         initData();
    //     }
    // }, []);

    // const initData = async () => {
    //     const data = await test();
    //     console.log(data);
    // };

    return <div className={`box ${prefixCls}`}>
        <div className={`${prefixCls}-main`}>
            {
                mainMenuList.map((menu,index) => {
                    return (
                        <div key={index} className={`font-14 ${prefixCls}-main-item ${menuActive == menu.key ? prefixCls + '-main-item-active' : ''}`}>{menu.title}</div>
                    )
                })
            }
        </div>
    </div>;
};

export default MenutPage;
