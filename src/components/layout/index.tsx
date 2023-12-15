import React, { useState } from 'react';
import { Layout, theme, ConfigProvider, Button } from 'antd';
import './index.less';
import { routeRender } from '@/router/index';
import SiderMenu from '../sider-menu'

const { Header, Content, Sider, Footer } = Layout;

const prefixCls = 'layout-page';

const LayoutPage: React.FC = () => {
    const [colorPrimary, setColorPrimary] = useState('#ec4141');

    const changePrimary = () => {
        setColorPrimary('#ccc');
    };

    return (
        <ConfigProvider
            theme={{
                cssVar: true,
                token: { colorPrimary: colorPrimary },
            }}
        >
            <Layout className="h-screen layout-page">
                <Header className={`${prefixCls}-header`}></Header>
                <Content className={`${prefixCls}-content`}>
                    <div className={`${prefixCls}-content-menu`}>
                        <SiderMenu />
                    </div>
                    <div className={`${prefixCls}-content-box`}>{routeRender}</div>
                </Content>
                <Footer className={`${prefixCls}-footer`}>Footer</Footer>
            </Layout>
        </ConfigProvider>
    );
};

export default LayoutPage;
