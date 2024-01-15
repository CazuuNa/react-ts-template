import { makeAutoObservable } from 'mobx'
// import cloneDeep from 'loadsh'
import _ from 'lodash'

//音乐播放管理
class PlayerStore {
	public currPlaySong: API.Song | null = null //当前正在播放音乐
	public playQueue: API.Song[] = [] //播放列表
	private currPlayIndex: number = -1 //当前正在播放音乐下标

	constructor() {
		makeAutoObservable(this)
		const tmp = localStorage.getItem('player-queue')
		//判断是否有播放列表无初始化列表，有赋值
		if (tmp === null) {
			localStorage.setItem('player-queue', JSON.stringify([]))
		} else {
			this.playQueue = JSON.parse(tmp)
			this.currPlaySong = this.playQueue[0]
			this.currPlayIndex = 0
		}
	}

	/**
	 * 初始化数据
	 */
	public initPlayerStore() {
		this.currPlaySong = null
		this.playQueue = []
		this.currPlayIndex = -1
	}

	/**
	 * 是否存在正在播放列表
	 * @return 有则返回下标无返回-1
	 */
	private hasCurrPlayQueue(song: API.Song): number {
		return this.playQueue.findIndex((v) => v.id === song.id) || -1
	}

	/**
	 * 更换播放列表
	 */

	public changePlayQueue(songs: Array<API.Song>) {
		console.log(songs)

		// this.playQueue = [...songs]
		this.playQueue = _.cloneDeep(songs)
		// const proto = Object.getPrototypeOf(this.playQueue)
		// console.log(proto.constructor);
		
		console.log(this.playQueue[0])
		console.log(this.playQueue)

		localStorage.setItem('player-queue', JSON.stringify(songs))
		this.currPlayIndex = 0
		this.currPlaySong = songs[0]
	}

	/** 临时播放当前音乐 */
	public playCurSong(song: API.Song) {
		const index = this.hasCurrPlayQueue(song)
		if (index !== -1) {
			// 若存在当前播放列表中，则播放列表中对应的歌曲
			this.currPlayIndex = index
		} else {
			// 若不存在播放列表中，则加到列表的最后并播放
			this.playQueue.push(song)
			localStorage.setItem('player-queue', JSON.stringify(this.playQueue))
			this.currPlayIndex++
		}
		this.currPlaySong = song
	}

	/** 上一首 */
	prevSong() {
		if (this.playQueue.length > 1) {
			this.currPlayIndex =
				(this.currPlayIndex - 1 + this.playQueue.length) % this.playQueue.length
			this.currPlaySong = this.playQueue[this.currPlayIndex]
		}
	}
	/** 下一首 */
	nextSong() {
		if (this.playQueue.length > 1) {
			this.currPlayIndex = (this.currPlayIndex + 1) % this.playQueue.length
			this.currPlaySong = this.playQueue[this.currPlayIndex]
		}
	}
}

export default PlayerStore
