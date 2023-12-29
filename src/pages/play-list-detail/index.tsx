import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Layout, Tag, Tooltip } from 'antd'
import './index.less'
import { getPlayListDetail } from '@/api/common'
import { useLocation } from 'react-router-dom'
import SongListTable from '@/components/song-list-table'
import { PlayCircleOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import mainStore from '@/store/mainStore'
import moment from 'moment'

const prefixCls = 'paly-list-detail-page'

const PlayListDetailPage: React.FC = () => {
    const {changePlayData} = mainStore
	console.log(useLocation())
	const { state } = useLocation()
	//详情数据-playlist
	const [playlist, setPlaylist] = useState<object>({})
	//特权数据
	const [privileges, setPrivileges] = useState<object[]>([])
	//歌单列表数据
	const [dataSource, SetDataSource] = useState<object[]>([])

	const isData = useRef(false)
	useEffect(() => {
		console.log(isData)
		if (!isData.current) {
			isData.current = true
			initData()
		}
	}, [])

    const playItem = (record:any) => {
        console.log(record);
        
        changePlayData(record)
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
							<PlayCircleOutlined onClick={() => {playItem(record)}} style={{ fontSize: '20px', color: '#ccc' }} />
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
		// const newTracks = data?.playlist?.tracks?.map(v => {
		//     return {
		//         name:v.name,
		//         ar
		//     }
		// })
		SetDataSource(data?.playlist?.tracks)
		console.log(data)
	}
	return (
		<div className={`box ${prefixCls}`}>
			<SongListTable
				columns={getColumns()}
				dataSource={dataSource}
				resetProps={{
					scroll: { x: '100%', y: 'calc(100vh - 280px)' },
					pagination: {
						defaultPageSize: 20,
						pageSizeOptions: [20, 50, 100]
					}
				}}
			/>
		</div>
	)
}

export default PlayListDetailPage
