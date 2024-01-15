import { Route, Routes, Navigate } from 'react-router-dom'
import { routes, IRoute } from './router'
import { Provider, KeepAlive } from 'react-keep-alive'

export const RouteData = (data: any[]) => {
	// const token = localStorage.getItem('token')
	const token = true
	console.log(token)

	return data.map((item: IRoute, index: number) => {
		return (
			<Routes>
				<Route
					key={item?.key ? item?.key : item?.path}
					path={item?.path}
					element={
						(item?.isAuth ? (!token ? true : false) : false) ? (
							<Navigate to="/login" replace={true} />
						) : (
							item?.element
						)
					}
					caseSensitive={item?.caseSensitive}
				>
					{item?.children &&
						item?.children?.map((child: any) => {
							return (
								<Route
									key={child?.key ? child?.key : child?.path}
									path={child?.path}
									element={
										(child?.isAuth ? (!token ? true : false) : false) ? (
											<Navigate to="/login" replace={true} />
										) : (
											child?.element
										)
									}
									caseSensitive={child?.caseSensitive}
								/>
							)
						})}
				</Route>
			</Routes>
		)
	})
}

export const routeRender = RouteData(routes)
