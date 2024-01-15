import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Tag, Tooltip, Button, Image, Spin } from 'antd'
import './index.less'
import { getPlayListDetail } from '@/api/common'
import { useLocation } from 'react-router-dom'
import SongListTable from '@/components/song-list-table'
import { PlayCircleOutlined, CaretRightOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import mainStore from '@/store/mainStore'
import useStores from '@/store/index'
import moment from 'moment'

const prefixCls = 'paly-list-detail-page'

const PlayListDetailPage: React.FC = () => {
	const { playerStore } = useStores()
	const { changePlayData } = mainStore
	console.log(useLocation())
	const { state } = useLocation()
	//页面loading
	const [loading, setLoading] = useState<boolean>(true)
	//详情数据-playlist
	const [playlist, setPlaylist] = useState<API.PlayListDetail>({
		name: ''
	})
	//特权数据
	const [privileges, setPrivileges] = useState<object[]>([])
	//歌单列表数据
	const [dataSource, SetDataSource] = useState<Array<API.Song>>([])

	const isData = useRef(false)
	useEffect(() => {
		console.log(isData)
		if (!isData.current) {
			isData.current = true
			initData()
		}
	}, [])

	const playItem = (record: any) => {
		console.log(record)

		changePlayData(record)
		playerStore.changePlayQueue([record] || [])
	}

	const getColumns = () => {
		return [
			{
				title: '操作',
				dataIndex: '',
				width: 1.5,
				render: (text: any, record: any, index: any) => {
					return (
						<Fragment>
							<PlayCircleOutlined
								onClick={() => {
									playItem(record)
								}}
								style={{ fontSize: '20px', color: '#ccc' }}
							/>
						</Fragment>
					)
				}
			},
			{
				title: '标题',
				dataIndex: 'name',
				width: 4,
				render: (text: any, record: any, index: any) => {
					const { fee = 0, sq = null, mv = null } = record
					return (
						<div className="song-list-table-name">
							<Tooltip placement="topLeft" title={text}>
								<div className="song-list-table-name-title">{text}</div>
							</Tooltip>

							{fee == 1 && <Tag color="#fe672e">VIP</Tag>}
							{!!sq && <Tag color="#ec4141">SQ</Tag>}
							{!!mv && <Tag color="#e31616">MV</Tag>}
						</div>
					)
				}
			},
			{
				title: '歌手',
				dataIndex: 'ar',
				width: 2,
				ellipsis: true,
				render: (text: any, record: any, index: any) => {
					const { ar } = record
					const title = ar?.map((v: any) => v?.name).join('/')
					return title || '-'
				}
			},
			{
				title: '专辑',
				dataIndex: 'al',
				width: 2,
				ellipsis: true,
				render: (text: any, record: any, index: any) => {
					const { al } = record
					const title = al?.name
					return title || '-'
				}
			},
			{
				title: '时间',
				width: 1,
				dataIndex: 'dt',
				render: (text: any, record: any, index: any) => {
					const { dt } = record
					return moment(dt).format('mm:ss') || '-'
				}
			}
		]
	}

	const initData = async () => {
		const { id } = state
		const data: any = await getPlayListDetail(id)
		setPlaylist(data?.playlist)
		setPrivileges(data?.privileges)
		SetDataSource(data?.playlist?.tracks)
		setLoading(false)
		console.log(data)
	}

	//保存歌单
	const savePlayList = () => {
		playerStore.changePlayQueue(dataSource)
	}

	return (
		<Fragment>
			{loading ? (
				<Spin spinning={loading}></Spin>
			) : (
				<div className={`box ${prefixCls}`}>
					<div className={` ${prefixCls}-top`}>
						<Image src={playlist?.coverImgUrl} height={280} width={280} />
						<div className={` ${prefixCls}-top-content`}>
							<div className={` ${prefixCls}-top-content-title`}>{playlist?.name}</div>
							<div className={` ${prefixCls}-top-content-create`}>
								<Button type='link'>{playlist?.creator?.nickname}</Button>
								{moment(playlist?.createTime).format("YYYY-MM-DD")}创建
							</div>
							<div className={` ${prefixCls}-top-content-control`}>
								<Button
									onClick={savePlayList}
									type="primary"
									icon={<CaretRightOutlined />}
								>
									播放全部
								</Button>
							</div>
							<div className={` ${prefixCls}-top-content-tag_song`}>
								标签:{
									playlist?.tags?.map((v,index) => {
										return (
											<Button type='link' key={index}>{v}</Button>
										)
									})
								}
							</div>
							<div className={` ${prefixCls}-top-content-tag_song`}>
								歌曲:{playlist?.trackCount}
							</div>
							<div className={` ${prefixCls}-top-content-tag_song`}>
								简介:{playlist?.description}
							</div>
						</div>
					</div>
					<SongListTable
						columns={getColumns()}
						dataSource={dataSource}
						resetProps={{
							rowKey:'id',
							pagination: false,
							sticky:true
						}}
					/>
				</div>
			)}
		</Fragment>
	)
}

export default PlayListDetailPage
