import React, { useState, useEffect, useRef } from 'react'
import { Slider } from 'antd'
import './index.less'
import { test } from '@/api/common'
import { useLocation } from 'react-router-dom'
import { BgColorsOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import mainStore from '@/store/mainStore'
import moment from 'moment'

const prefixCls = 'player-progress-page'

interface IProps {
	sliderValue: number
	changeDt: (e: any) => void
	dt: number | undefined
}

const playerProgressPage: React.FC<IProps> = (props) => {
	const { sliderValue, dt, changeDt } = props
	console.log(sliderValue)

	return (
		<div className={`${prefixCls}`}>
			<div className={`${prefixCls}-controls`}></div>
			<div className={`${prefixCls}-progress`}>
				<div className={`${prefixCls}-progress-time`}>
					{moment(sliderValue).format('mm:ss')}
				</div>
				<div className={`${prefixCls}-progress-center`}>
					<Slider
						min={0}
						max={dt}
						value={sliderValue}
						onChange={(value: any) => {
							changeDt(value)
						}}
						tooltip={{
							formatter: (value: any) => `${moment(value).format('mm:ss')}`
						}}
					/>
				</div>
				<div className={`${prefixCls}-progress-time`}>
					{moment(dt).format('mm:ss')}
				</div>
			</div>
		</div>
	)
}

export default playerProgressPage
