import React, { useState, useEffect, useRef } from 'react'
import { Image, message } from 'antd'
import './index.less'
import { test } from '@/api/common'
import { useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import mainStore from '@/store/mainStore'
import moment from 'moment'
import PlayerProgressPage from '../player-progress'

const prefixCls = 'footer-player-page'
interface footerPlayerProps {
	colorPrimary?: string
}
const FooterPlayerPage: React.FC<footerPlayerProps> = (props) => {
	const {
		data: { playData },
		changePlayData
	} = mainStore
	const { name, al, ar, dt, id } = playData
	const [isPlay, setIsPlay] = useState<boolean>(false) // 是否正在播放
	const [sliderValue, setSliderValue] = useState<number>(0)
	const playerRef = useRef<HTMLAudioElement>(null)

	const [playTimer, setPlayTimer] = useState<any>(null)

	useEffect(() => {
		console.log(playData)
		if (playData?.id != 0) {
			try {
				playerRef
					?.current!.play()
					.then((res) => {
						console.log(res)
					})
					.catch((err) => {
						console.log(err)
						message.error({
							content: '当前歌曲暂无法播放'
						})
						changePlayData({ id: 0, name: '' })
					})
			} catch (err) {
				console.log(err)
				message.error({
					content: '当前歌曲暂无法播放'
				})
				changePlayData({ id: 0, name: '' })
			}
		}
	}, [playData])

	useEffect(() => {}, [playTimer])

	const changeDt = (e: any) => {
		console.log(e)
        const time = moment(e).format('ss')
        console.log(Number(time));
	}

	const timeUpdate = (e: any) => {
        const cur = Number(playerRef.current?.currentTime).toFixed(3) 
		setSliderValue(Number(cur) * 1000)
	}

	return (
		<div className={`${prefixCls}`}>
			<div className={`${prefixCls}-title`}>
				<Image src={al?.picUrl} alt={name} width={40} />
				<div className={`${prefixCls}-title-name`}>{name || '-'}</div>
			</div>
			<div className={`${prefixCls}-progress`}>
				<audio
					autoPlay
					ref={playerRef}
					src={`https://music.163.com/song/media/outer/url?id=${id}.mp3`}
					onPlayCapture={(e: any) => console.log(e)}
					onEnded={(e: any) => console.log(e)}
					onTimeUpdate={(e: any) => {
						timeUpdate(e)
					}}
				/>
				<PlayerProgressPage
					sliderValue={sliderValue}
					changeDt={changeDt}
					dt={dt}
				/>
			</div>
			<div className={`${prefixCls}-menu`}></div>
		</div>
	)
}

export default observer(FooterPlayerPage)
