import * as lodash from 'lodash'
// 重试次数
let retry = 3
let retryMusic = 5

const playerMusic = {
  initAudio(that) {
    const ele = that.audioEle
    console.log('that.audioEle', that.audioEle)
    // 音频缓冲事件
    ele.onprogress = () => {
      try {
        if (ele.buffered.length > 0) {
          const duration = that.currentMusic.duration
          let buffered = 0
          ele.buffered.end(0)
          buffered =
            ele.buffered.end(0) > duration ? duration : ele.buffered.end(0)
          that.currentProgress = buffered / duration
        }
      } catch (e) {
        console.error(e)
      }
    }
    // 开始播放音乐
    ele.onplay = () => {
      let timer
      clearTimeout(timer)
      timer = setTimeout(() => {
        that.musicReady = true
      }, 100)
    }

    ele.ontimeupdate = lodash.throttle(function () {
      if (!that.dragFlag) {
        if (that.playing) {
          const currentTime = parseInt(ele.currentTime)
          that.setCurrentTime(currentTime)
        }
      }
    }, 1000)
    // 当前音乐播放完毕
    ele.onended = () => {
      that.playNextMusic()
    }
    // 音乐播放出错
    ele.onerror = () => {
      if (retry === 0) {
        retry = 3
        that.playNextMusic()
      } else {
        console.log(`重试${retry}次`)
        retry -= 1
      }
      console.log('播放出错啦！')
    }
    // 音乐进度拖动大于加载时重载音乐或音频数据不可用时
    ele.onstalled = () => {
      if (retryMusic === 0) {
        retryMusic = 5
        that.playNextMusic()
      } else {
        ele.load()
        that.setPlaying(false)
        retryMusic -= 1
        let timer
        clearTimeout(timer)
        console.log('音频不可用呀~~', retryMusic)
        timer = setTimeout(() => {
          that.setPlaying(true)
        }, 10)
      }
    }
    // 将能播放的音乐加入播放历史
    ele.oncanplay = () => {
      retry = 1
    }
    // 当音频已暂停时
    ele.onpause = () => {
      that.setPlaying(false)
    }
  },
}

export default playerMusic
