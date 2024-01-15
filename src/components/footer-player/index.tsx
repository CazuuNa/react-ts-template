import React, { useState, useEffect, useRef } from 'react'
import { Image, Input, Slider, message } from 'antd'
import './index.less'
import { test } from '@/api/common'
import { useLocation } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import useStores from '@/store'
import moment from 'moment'
import { SoundOutlined } from '@ant-design/icons'
import PlayerProgressPage from '../player-progress'

const prefixCls = 'footer-player-page'
interface footerPlayerProps {
	colorPrimary?: string
}
const FooterPlayerPage: React.FC<footerPlayerProps> = (props) => {
	const { playerStore } = useStores()
	const { currPlaySong, playQueue } = playerStore

	const [isPlay, setIsPlay] = useState<boolean>(false) // 是否正在播放
	const [sliderValue, setSliderValue] = useState<number>(0)
	const playerRef = useRef<HTMLAudioElement>(null)
	const [playTimer, setPlayTimer] = useState<any>(null)

	useEffect(() => {
		const data = playerStore.playQueue[0]
		console.log(data);
		console.log(playerStore.playQueue[0]);
		if (!!currPlaySong?.id) {
			try {
				playerRef
					?.current!.play()
					.then((res) => {
						console.log(currPlaySong)
						setIsPlay(true)
						console.log(res)
					})
					.catch((err) => {
						playerError(err)
					})
			} catch (err) {
				playerError(err)
			}
		}
	}, [])

	const playerError = (err: any) => {
		console.log(err)
		const data = playerStore.playQueue[0]
		console.log(data);
		console.log(playerStore.playQueue[0]);
		
		
		// console.log([...playerStore.playQueue]);

		// if (data?.length == 1) {
		// 	message.error({
		// 		content: '当前歌曲暂无法播放'
		// 	})
		// 	return playerStore?.initPlayerStore()
		// } else if (data?.length > 0) {
		// 	playerStore?.nextSong()
		// }
	}

	useEffect(() => {}, [playTimer])

	const changeDt = (e: any) => {
		console.log(e)
		const time = moment(e).format('ss')
		console.log(Number(time))
	}

	//监听时间变化
	const timeUpdate = (e: any) => {
		const cur = Number(playerRef.current?.currentTime).toFixed(3)
		setSliderValue(Number(cur) * 1000)
	}

	//调节音量
	const haneleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (playerRef.current?.volume || playerRef.current?.volume === 0) {
			playerRef.current.volume = parseInt(e.target.value) / 100
		}
	}

	const handleFull = () => {
		console.log(123);
		
	}

	return (
		<div className={`${prefixCls}`}>
			<div className={`${prefixCls}-title`}>
				<Image
					src={currPlaySong?.al?.picUrl}
					alt={currPlaySong?.name}
					width={40}
					onClick={handleFull}
					preview={false}
				/>
				<div className={`${prefixCls}-title-name`}>
					{currPlaySong?.name || '-'}
				</div>
			</div>
			<div className={`${prefixCls}-progress`}>
				<audio
					autoPlay
					ref={playerRef}
					src={`https://music.163.com/song/media/outer/url?id=${currPlaySong?.id}.mp3`}
					onPlayCapture={(e: any) => console.log(e)}
					onEnded={(e: any) => console.log(e)}
					onTimeUpdate={(e: any) => {
						timeUpdate(e)
					}}
				/>
				<PlayerProgressPage
					sliderValue={sliderValue}
					changeDt={changeDt}
					dt={currPlaySong?.dt}
					isPlay={isPlay}
					playNextSong={() => playerStore.nextSong()}
					playPrevSong={() => playerStore.prevSong()}
					playPauseSong={() => {
						playerRef.current!.pause()
						setIsPlay(false)
					}}
					playContinueSong={() => {
						playerRef.current!.play()
						setIsPlay(true)
					}}
				/>
			</div>
			<div className={`${prefixCls}-menu`}>
				<div className={`${prefixCls}-menu-volume`}>
					<SoundOutlined
						style={{ fontSize: '24px', color: 'rgba(0,0,0,0.4)' }}
					/>
					<input
						className={`${prefixCls}-menu-volume-ipt`}
						type="range"
						min="0"
						max="100"
						defaultValue="100"
						onChange={haneleVolumeChange}
					/>
					{/* <Slider vertical max={100} min={0}   /> */}
				</div>
			</div>
		</div>
	)
}

export default observer(FooterPlayerPage)
