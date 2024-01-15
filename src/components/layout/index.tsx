import React, { useEffect, useState } from 'react'
import { Layout, theme, ConfigProvider, Button } from 'antd'
import type { Color, ColorPickerProps } from 'antd/es/color-picker'
import './index.less'
import { routeRender } from '@/router/index'
import { routes, IRoute } from '@/router/router'
import SliderMenu from '../slider-menu'
import HeaderMenu from '../header-menu'
import FooterPlayer from '../footer-player'
import { useLocation  } from 'react-router-dom'
import KeepAlive from 'react-router-dom6-keepalive'

const { Header, Content, Sider, Footer } = Layout

const prefixCls = 'layout-page'

const LayoutPage: React.FC = () => {
	const { pathname } = useLocation()

    const [prevPathName,setPrevPathName] = useState('') 
	useEffect(() => {
		console.log(pathname)
        localStorage.setItem('prevPathName',prevPathName)
        setPrevPathName(pathname)
	}, [pathname])

	const [colorPrimary, setColorPrimary] = useState<string>('#ec4141')

	const changePrimaryColor = (color: any) => {
		setColorPrimary(color)
	}

	return (
		<ConfigProvider
			theme={{
				cssVar: true,
				token: { colorPrimary: colorPrimary }
			}}
		>
			<Layout className="h-screen layout-page">
				<Header className={`${prefixCls}-header`}>
					<HeaderMenu
						changePrimaryColor={changePrimaryColor}
						colorPrimary={colorPrimary}
					/>
				</Header>
				<Content className={`${prefixCls}-content`}>
					{pathname !== '/login' && (
						<div className={`${prefixCls}-content-menu`}>
							<SliderMenu />
						</div>
					)}
					<div className={`${prefixCls}-content-box`}>{routeRender}</div>
				</Content>
				<Footer className={`${prefixCls}-footer`}>
					<FooterPlayer colorPrimary={colorPrimary} />
				</Footer>
			</Layout>
		</ConfigProvider>
	)
}

export default LayoutPage
