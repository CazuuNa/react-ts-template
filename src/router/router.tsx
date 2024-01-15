import React from 'react'
import { Home, Discover, SongList, PlayListDetail,Login } from '@/pages/index'

export interface IRoute {
	caseSensitive?: boolean
	element?: React.ReactNode | null
	index?: false
	path: string
	key?: any
	title?: string
	[name: string]: any
	children?: Array<IRoute>
}

export const routes: Array<IRoute> = [
	{
		path: '/',
		key: 1,
		element: <Home />,
		isAuth:false,
		children: [
			{
				path: '',
				caseSensitive: true,
				key: 2,
				isAuth:false,
				element: <Discover />,
			},
			{
				path: 'songlist',
				caseSensitive: true,
				key: 3,
				isAuth:false,
				element: <SongList />,
			}
		]
	},
	{
		path: 'playlist-detail',
		caseSensitive: true,
		key: 4,
		isAuth:true,
		element: <PlayListDetail />
	},
	{
		path: 'login',
		caseSensitive: true,
		key: 4,
		isAuth:false,
		element: <Login />
	},
]
