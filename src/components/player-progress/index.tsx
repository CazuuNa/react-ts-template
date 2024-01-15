import React, { useState, useEffect, useRef } from 'react'
import { Slider } from 'antd'
import './index.less'
import { test } from '@/api/common'
import { useLocation } from 'react-router-dom'
import {
	VerticalRightOutlined,
	VerticalLeftOutlined,
	PauseCircleOutlined,
	PlayCircleOutlined
} from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import mainStore from '@/store/mainStore'
import moment from 'moment'

const prefixCls = 'player-progress-page'

interface IProps {
	sliderValue: number
	changeDt: (e: any) => void
	dt: number | undefined
	isPlay: boolean
	playNextSong: (e: any) => void
	playPrevSong: (e: any) => void
	playPauseSong: (e: any) => void
	playContinueSong: (e: any) => void
}

const playerProgressPage: React.FC<IProps> = (props) => {
	const {
		sliderValue,
		dt,
		isPlay,
		changeDt,
		playNextSong,
		playPrevSong,
		playPauseSong,
		playContinueSong
	} = props

	return (
		<div className={`${prefixCls}`}>
			<div className={`${prefixCls}-controls`}>
				<VerticalRightOutlined
					onClick={playPrevSong}
					className={`${prefixCls}-controls-icon`}
				/>
				{isPlay ? (
					<PauseCircleOutlined
						onClick={playPauseSong}
						className={`${prefixCls}-controls-icon`}
					/>
				) : (
					<PlayCircleOutlined
						onClick={playContinueSong}
						className={`${prefixCls}-controls-icon`}
					/>
				)}
				<VerticalLeftOutlined
					onClick={playNextSong}
					className={`${prefixCls}-controls-icon`}
				/>
			</div>
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
