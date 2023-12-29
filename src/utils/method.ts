import { useNavigate } from 'react-router-dom'

//路由跳转
const toNavigateLink = (url:string,data?:object) => {
	// const useNavigateTo = useNavigate()
    // useNavigateTo(url,{...data})
}

//数字转万为单位
const formatNumber = (num: number | string) => {
	num = Number(num)
	if (num == 0 || (num > 0 && num < 10000)) {
		return num + ''
	} else {
		return (num / 10000).toFixed(2) + '万'
	}
}

export { toNavigateLink,formatNumber }