import { Route, Routes } from 'react-router-dom'
import { routes, IRoute } from './router'

export const RouteData = (data: any[]) => {
	return data.map((item: IRoute, index: number) => {
		return (
			<Routes>
				<Route
					key={item?.key ? item?.key : index}
					path={item?.path}
					element={item?.element}
					caseSensitive={item?.caseSensitive}
				>
					{item?.children &&
						item?.children?.map((child: any) => {
							return (
								<Route
									key={child?.key ? item?.key : item?.path}
									path={child?.path}
									element={child?.element}
									caseSensitive={item?.caseSensitive}
								/>
							)
						})}
				</Route>
			</Routes>
		)
	})
}

export const routeRender = RouteData(routes)
