import React, { useState, useEffect, useRef, Fragment } from 'react'
import { Table } from 'antd'
import { TableProps } from 'antd/lib/table/InternalTable'
import './index.less'

const prefixCls = 'song-list-table'

interface songListTableProps {
	dataSource: object[]
	columns: object[]
	resetProps?: TableProps<any>
}

const SongListTable: React.FC<songListTableProps> = (props) => {
	const { dataSource, columns, resetProps } = props
	console.log(dataSource, columns, resetProps)
	const tableId = useRef(Math.random())
	useEffect(() => {
	}, [])

	return (
		<Fragment>
			<Table
				id={String(tableId.current)}
				dataSource={dataSource}
				columns={columns}
				{...resetProps}
			></Table>
			<div id="rightMenu"></div>
		</Fragment>
	)
}

export default SongListTable
