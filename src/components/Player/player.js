import * as lodash from 'lodash'
// number of retries
let retry = 3
let retryMusic = 5

const playerMusic = {
  initAudio(that) {
    const ele = that.audioEle

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
    // start playing music
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

    ele.onended = () => {
      that.playNextMusic()
    }

    ele.onerror = () => {
      if (retry === 0) {
        retry = 3
        that.playNextMusic()
      } else {
        retry -= 1
      }
    }

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
        timer = setTimeout(() => {
          that.setPlaying(true)
        }, 10)
      }
    }

    ele.oncanplay = () => {
      retry = 1
    }

    ele.onpause = () => {
      that.setPlaying(false)
    }
  },
}

export default playerMusic
