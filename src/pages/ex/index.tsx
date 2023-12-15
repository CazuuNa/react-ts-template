import React, { useState, useEffect, useRef } from 'react';
import { Layout, theme, ConfigProvider, Button } from 'antd';
import './index.less';
import { test } from '@/api/common';
import { useLocation } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;

const prefixCls = 'ex-page';

const ExPage: React.FC = () => {
    console.log(useLocation());
    const isData = useRef(false);
    useEffect(() => {
        console.log(isData);
        if (!isData.current) {
            isData.current = true;
            initData();
        }
    }, []);

    const initData = async () => {
        const data = await test();
        console.log(data);
    };
    return <div className={`box ${prefixCls}`}>ex</div>;
};

export default ExPage;
