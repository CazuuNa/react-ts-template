import { useRef, useEffect, useCallback } from 'react'
// 防抖
const useDebounce = (fn: (args: any) => void, delay: number, dep = []) => {
	const { current } = useRef<any>({ fn, timer: null })
	useEffect(
		function () {
			current.fn = fn
		},
		[current, fn]
	)

	return useCallback((...args: any) => {
		if (current.timer) {
			clearTimeout(current.timer)
		}
		current.timer = setTimeout(() => {
			current.fn(...args)
		}, delay)
	}, dep)
}

export default useDebounce
