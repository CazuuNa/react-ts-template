import { useRef, useEffect, useCallback } from 'react'
//节流
function useThrottle(fn: (args: any) => void, delay: number, dep = []) {
	const { current } = useRef<any>({ fn, timer: null })
	useEffect(
		function () {
			current.fn = fn
		},
		[fn]
	)

	return useCallback((...args: any) => {
		if (!current.timer) {
			current.timer = setTimeout(() => {
				delete current.timer
			}, delay)
			current.fn(...args)
		}
	}, dep)
}

export default useThrottle
