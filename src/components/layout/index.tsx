import React, { useEffect, useState } from 'react';
import { Layout, theme, ConfigProvider, Button } from 'antd';
import type { Color,ColorPickerProps  } from 'antd/es/color-picker';
import './index.less';
import { routeRender } from '@/router/index';
import { routes, IRoute } from '@/router/router';
import SiderMenu from '../sider-menu'
import HeaderMenu from '../header-menu'
import FooterPlayer from '../footer-player'
import { useLocation } from 'react-router-dom';

const { Header, Content, Sider, Footer } = Layout;

const prefixCls = 'layout-page';

const LayoutPage: React.FC = () => {
    const { pathname } = useLocation();
    useEffect(() => {
        console.log(pathname);
        
    },[pathname])


    const [colorPrimary, setColorPrimary] = useState<string>('#ec4141');

    const changePrimaryColor = (color:any) => {
        setColorPrimary(color);
    };

    return (
        <ConfigProvider
            theme={{
                cssVar: true,
                token: { colorPrimary: colorPrimary },
            }}
        >
            <Layout className="h-screen layout-page">
                <Header className={`${prefixCls}-header`}>
                    <HeaderMenu  changePrimaryColor={changePrimaryColor} colorPrimary={colorPrimary} />
                </Header>
                <Content className={`${prefixCls}-content`}>
                    <div className={`${prefixCls}-content-menu`}>
                        <SiderMenu />
                    </div>
                    <div className={`${prefixCls}-content-box`}>{routeRender}</div>
                </Content>
                <Footer className={`${prefixCls}-footer`}>
                    <FooterPlayer colorPrimary={colorPrimary} />
                </Footer>
            </Layout>
        </ConfigProvider>
    );
};

export default LayoutPage;
