import React, { useState, useEffect, useRef } from 'react'
import { Button, Input, Form, Radio } from 'antd'
import './index.less'
import { test } from '@/api/common'
import { useLocation } from 'react-router-dom'
import { QrcodeOutlined } from '@ant-design/icons'
import { observer } from 'mobx-react-lite'
import mainStore from '@/store/mainStore'
import moment from 'moment'

const prefixCls = 'login-page'

const LoginPage: React.FC = () => {
	const submit = () => {
		console.log(form.current)

		console.log(
			form.current
				?.validateFields((res: any, err: any) => {
					console.log(res, err)
				})
				.then((res: any) => {
					console.log(res)
				})
				.catch((err: any) => {
					console.log(err)
				})
		)
	}
	const form = useRef<any>()

    const getQrCode = () => {
        
    }
	return (
		<div className={`${prefixCls}`}>
			<div className={`${prefixCls}-box`}>
				<QrcodeOutlined
					style={{ fontSize: 48 }}
					className={`${prefixCls}-box-qrcode`}
                    onClick={getQrCode}
				/>
				<div className={`${prefixCls}-box-form`}>
					<Form ref={form} labelAlign="right" labelCol={{ span: 5 }}>
						<Form.Item shouldUpdate noStyle>
							{() => {
								const type = form.current?.getFieldValue('type')
								return type === 'email' ? (
									<Form.Item
										rules={[{ required: true }]}
										name="name"
										label="邮箱"
									>
										<Input />
									</Form.Item>
								) : (
									<Form.Item
										rules={[{ required: true }]}
										name="name"
										label="手机号"
									>
										<Input />
									</Form.Item>
								)
							}}
						</Form.Item>
						<Form.Item
							name="password"
							rules={[{ required: true }]}
							label="密码"
						>
							<Input type="password" />
						</Form.Item>
						<Form.Item name="type">
							<Radio.Group defaultValue="phone" className="flex justify-center">
								<Radio value="phone">手机号登录</Radio>
								<Radio value="email">邮箱登录</Radio>
							</Radio.Group>
						</Form.Item>
						<div className="flex justify-center">
							<Button onClick={submit} type="primary" block>
								登录
							</Button>
						</div>
					</Form>
				</div>
			</div>
		</div>
	)
}

export default LoginPage
