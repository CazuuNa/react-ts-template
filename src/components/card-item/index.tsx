import React, { useState, useEffect, useRef } from 'react'
import { Layout, theme, ConfigProvider, Button, Image } from 'antd'
import { formatNumber } from '@/utils/index'
import './index.less'

const prefixCls = 'card-item-page'

interface itemData {
	id: number
	name: string
	picUrl: string
	playCount: number | string
	trackCount?: number
}
interface cardItemProps {
	data: itemData
	type?: string //border 卡片形式 tiled 平铺
	style?: object
	toClick: (e: any) => void
}
const CardItemPage: React.FC<cardItemProps> = (props) => {
	const { data, type = 'border', style, toClick } = props
	const { id, name, picUrl, playCount, trackCount } = data
	return (
		<div style={style} className={`${prefixCls}-${type}`} onClick={toClick}>
			{type === 'border' ? (
				<div className={`${prefixCls}-${type}-main`}>
					<div className={`${prefixCls}-${type}-main-img`}>
						<Image
							style={{
								borderRadius: '6px',
								width: '100%',
								paddingBottom: '50%'
							}}
							src={picUrl}
							preview={false}
						/>
						<div className={`${prefixCls}-${type}-main-img-num`}>
							{formatNumber(playCount)}
						</div>
					</div>
					<div className={`${prefixCls}-${type}-main-title`}>{name}</div>
				</div>
			) : (
				<div className={`${prefixCls}-${type}-main`}>
					<img src={picUrl} className={`${prefixCls}-${type}-main-img`} />
				</div>
			)}
		</div>
	)
}

export default CardItemPage
