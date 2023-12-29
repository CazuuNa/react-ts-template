import React, { useState, useEffect, useRef } from 'react';
import { Layout, theme, ConfigProvider, Button } from 'antd';
import './index.less';
import { test } from '@/api/common';
import { useLocation } from 'react-router-dom';
import { BgColorsOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import mainStore from '@/store/mainStore'
import moment from 'moment'

const prefixCls = 'ex-page';

const ExPage: React.FC = () => {
    const {
		data: { playData },
		changePlayData
	} = mainStore
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
