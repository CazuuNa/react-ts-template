import { makeAutoObservable } from 'mobx'

interface StoreProps {
	data: {
		playData: API.Song
	}
	changePlayData: (value: any) => void
}

const mainStore: StoreProps = makeAutoObservable<StoreProps>({
	data: {
		playData: {
            id:0,
            name:''
        }
	},
	changePlayData: (val: any) => (mainStore.data.playData = { ...val }) // action
})

export default mainStore
