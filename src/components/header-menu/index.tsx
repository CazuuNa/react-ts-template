import React, { useState, useEffect, useRef } from 'react'
import { ColorPicker, Input, Select } from 'antd'
import './index.less'
import { useLocation } from 'react-router-dom'
import { BgColorsOutlined } from '@ant-design/icons'
import type { Color, ColorPickerProps } from 'antd/es/color-picker'
import DebounceSelectPage from '../debounce-select'
const prefixCls = 'header-page'

interface headerProps {
	changePrimaryColor: (e: any) => void //更改主题色
	colorPrimary?: string
}

const HeaderPage: React.FC<headerProps> = (props) => {

	const { changePrimaryColor, colorPrimary } = props

	const [formatHex, setFormatHex] = useState<ColorPickerProps['format']>('hex')
	const [keyword,setKeyword] = useState<string>('')
	const changeColor = (e: any) => {
		changePrimaryColor(e.toHexString())
	}

	const changeKeyword = (e:any) => {

	}

	return (
		<div className={`${prefixCls}`}>
			<div className={`${prefixCls}-log`}></div>
			<ColorPicker
				value={colorPrimary}
				onChange={changeColor}
				format={formatHex}
				onFormatChange={setFormatHex}
                presets={[
                    {
                      label: 'Recommended',
                      colors: [
                        '#ec4141',
                        '#FA8C16',
                        '#FADB14',
                        '#8BBB11',
                        '#52C41A',
                        '#13A8A8',
                        '#1677FF',
                        '#2F54EB',
                        '#722ED1',
                        '#EB2F96',
                      ],
                    }
                  ]}
              
			>
				<BgColorsOutlined style={{ color: '#fff', fontSize: 20 }} />
			</ColorPicker>

			<DebounceSelectPage />
		</div>
	)
}

export default HeaderPage
