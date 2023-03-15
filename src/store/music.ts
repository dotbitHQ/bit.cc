/**
 * @description 播放列表，不建议修改
 */
import { Module } from 'vuex'
import { augmentKeys } from './-/helpers'
import { useKolo } from '~/hooks/useKolo'
import { KoloNftAsset } from '../../types/kolo'

function findIndex(list: any[], music: KoloNftAsset) {
  return list.findIndex(item => {
    return item.audioUrl === music.audioUrl
  })
}

interface IState {
  audioEle: any,
  mode: string,
  playing: boolean,
  playlist: KoloNftAsset[],
  volume: number,
  currentIndex: number,
  currentTime: number
}

interface IRootState {
}

const types = {
  // mutations
  SET_AUDIOELE: 'SET_AUDIOELE',
  SET_PLAYMODE: 'SET_PLAYMODE',
  SET_PLAYING: 'SET_PLAYING',
  SET_PLAYLIST: 'SET_PLAYLIST',
  SET_VOLUME: 'SET_VOLUME',
  SET_CURRENTINDEX: 'SET_CURRENTINDEX',
  SET_CURRENTTIME: 'SET_CURRENTTIME',
}


const { setVolume, kolo } = useKolo()

const musicStore: Module<IState, IRootState> = {
  state () {
    return {
      audioEle: null, // audio元素
      mode: 'sequence', // 播放模式，默认列表循环
      playing: false, // 播放状态
      playlist: [], // 播放列表
      volume: kolo.volume, // 音量
      currentIndex: -1, // 当前音乐索引
      currentTime: 0
    }
  },
  getters: {
    // audio元素
    audioEle: state => state.audioEle,
    // 播放模式
    mode: state => state.mode,
    // 播放状态
    playing: state => state.playing,
    // 播放列表
    playlist: state => state.playlist,
    // 音量
    volume: state => state.volume,
    // 当前音乐索引
    currentIndex: state => state.currentIndex,
    // 当前音乐索引
    currentTime: state => state.currentTime,
    // 当前音乐
    currentMusic: state => {
      return state.playlist[state.currentIndex] || {}
    },
  },
  mutations: {
    // 修改audio元素
    [types.SET_AUDIOELE](state, audioEle): void {
      state.audioEle = audioEle
    },
    // 修改播放模式
    [types.SET_PLAYMODE](state, mode): void {
      state.mode = mode
    },
    // 修改播放状态
    [types.SET_PLAYING](state, playing): void {
      state.playing = playing
    },
    // 修改播放列表
    [types.SET_PLAYLIST](state, playlist): void {
      state.playlist = playlist
    },
    // 修改音量
    [types.SET_VOLUME](state, volume): void {
      state.volume = volume
    },
    // 修改当前音乐索引
    [types.SET_CURRENTINDEX](state, currentIndex): void {
      state.currentIndex = currentIndex
    },
    // 修改当前音乐播放时间
    [types.SET_CURRENTTIME](state, currentTime): void {
      state.currentTime = currentTime
    }
  },
  actions: {
    // 设置播放列表
    setPlaylist({ commit }, { list }): void {
      commit(types.SET_PLAYLIST, list)
    },

    // 选择播放（会更新整个播放列表）
    selectPlay({ commit }, { list, index }): void {
      commit(types.SET_PLAYLIST, list)
      commit(types.SET_CURRENTINDEX, index)
      // commit(types.SET_PLAYING, true)
    },
    // 选择播放（会添加播放列表）
    selectAddPlayList({ commit, state }, { list }) {
      let newList = [...state.playlist]
      let playIndex = 0
      list.forEach((music: KoloNftAsset) => {
        let index = findIndex(newList, music)
        if (index > -1) {
          playIndex = index
        } else {
          newList.unshift(music)
        }
      });
      commit(types.SET_PLAYLIST, newList)
      commit(types.SET_CURRENTINDEX, playIndex)
    },
    // 选择播放（会插入一条到播放列表）
    selectAddPlay({ commit, state }, music): void {
      let list = [...state.playlist]
      // 查询当前播放列表是否有代插入的音乐，并返回其索引值
      let index = findIndex(list, music)
      // 当前播放列表有待插入的音乐时，直接改变当前播放音乐的索引值
      if (index > -1) {
        commit(types.SET_CURRENTINDEX, index)
      } else {
        list.unshift(music)
        commit(types.SET_PLAYLIST, list)
        commit(types.SET_CURRENTINDEX, 0)
      }
      // commit(types.SET_PLAYING, true)
    },

    // 清空播放列表
    clearPlayList({ commit }): void {
      commit(types.SET_PLAYING, false)
      commit(types.SET_CURRENTINDEX, -1)
      commit(types.SET_PLAYLIST, [])
    },

    // 删除正在播放列表中的歌曲
    removerPlayListItem({ commit, state }, { list, index }): void {
      let currentIndex = state.currentIndex
      list.splice(index, 1)
      if (index < state.currentIndex || list.length === state.currentIndex) {
        currentIndex--
        commit(types.SET_CURRENTINDEX, currentIndex)
      }
      commit(types.SET_PLAYLIST, list)
      if (!list.length) {
        commit(types.SET_PLAYING, false)
      } else {
        commit(types.SET_PLAYING, true)
      }
    },
    // 设置音量
    setVolume({ commit }, volume): void {
      commit(types.SET_VOLUME, volume)
    },
    // 设置音量并存储
    setVolumeChange({ commit }, volume): void {
      commit(types.SET_VOLUME, setVolume(volume))
    },
    // 设置音量静音与还原
    setVolumeMute({ commit }, isMute): void {
      if (isMute) {
        commit(types.SET_VOLUME, 0)
      } else {
        commit(types.SET_VOLUME, Number(kolo.volume))
      }
    },
    // 设置播放模式
    setPlayMode({ commit }, mode): void {
      commit(types.SET_PLAYMODE, mode)
    },
    // 控制播放暂停
    setPlaying({ commit, state, getters }, playing): void {
      commit(types.SET_PLAYING, playing)
    },
  }
}

export {
  IState as IMusicState
}
export const musicKeys = augmentKeys(types, 'music')

export default musicStore
