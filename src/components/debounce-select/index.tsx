import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Select, Spin } from 'antd'
import './index.less'
import { getSearchSuggest } from '@/api/common'
import { useLocation } from 'react-router-dom'
import { BgColorsOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import mainStore from '@/store/mainStore'
import type { SelectProps } from 'antd/es/select'
import _ from 'lodash'

const { debounce } = _
const { Option } = Select

const prefixCls = 'debounce-select-page'

const searchType: Record<string, string> = {
	albums: '专辑',
	artists: '歌手',
	songs: '单曲',
	playlists: '歌单'
}

const DebounceSelectPage: React.FC = () => {
	const [options, setOptions] = useState<any>([])
	const [value, setValue] = useState<string>('')

	//查询
	const searchKeywords = debounce(async (val: string) => {
		setValue(val)
		const data: any = await getSearchSuggest(val)
		console.log(data)
		const res = data?.result
		const key = _.keys(res)
		const op = await key
			.filter((v: string) => v !== 'order')
			.map((v: string) => {
				return {
					label: searchType[v],
					value: v,
					options: res[v]?.map((i: any) => {
						return {
							label: i?.name,
							value: i?.id,
							...i
						}
					})
				}
			})
		setOptions(op)
	}, 500)

	useEffect(() => {
		renderOptions()
	}, [options])

	const renderOptions = () => {
		return options?.map((v: any) => {
			return (
				<Fragment>
					<Option key={v.value}>
						<div className={`${prefixCls}-optGroup`}>{v.label}</div>
					</Option>
					{v?.options?.map((op: any) => {
						return (
							<Option key={op.value}>
								<div className={`${prefixCls}-option`}>{op?.label}</div>
							</Option>
						)
					})}
				</Fragment>
			)
		})
	}

	return (
		<Select
			showSearch
			value={value}
			placeholder="输入关键字"
			onSearch={(val: string) => {
				searchKeywords(val)
			}}
			style={{ width: '100%' }}
			// options={options}
			filterOption={false}
		>
			{renderOptions()}
		</Select>
	)
}

export default DebounceSelectPage
