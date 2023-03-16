<template>
  <div>
    <div class="player" v-show="isPlayer">
      <div class="player-content">
        <div class="content">
          <transition name="fade" enter-active-class="fadeInRight" leave-active-class="fadeOutRight">
            <div class="content-box animated" v-show="infoShow">
              <div class="content-bg-nav">
                <div class="content-bg" ref="contentBg">
                  <div class="mask"></div>
                </div>
              </div>
              <div class="content-info">
                <p class="title">{{ currentMusic.title }}</p>
                <div class="control-btn">
                  <img src="/imgs/kolo/icon-prev.svg" class="pointer order" @click="play(true)" alt="">
                  <img :src="playing ? '/imgs/kolo/icon-pause.svg?v=1' : '/imgs/kolo/icon-play.svg?v=1'" class="pointer" @click="handlePlay" alt="">
                  <img src="/imgs/kolo/icon-next.svg" class="pointer order" @click="play(false)" alt="">
                  <div class="play-time">
                    <span>
                      {{ getCurrentTime }}/{{ getTiming }}
                    </span>
                  </div>
                </div>
                <other-control @toggleList="toggleList"></other-control>
              </div>
            </div>
          </transition>
        </div>
        <div class="img-nav">
          <img ref="audioBg" :src="currentMusic.cover" :class="playing ? 'playing-true' : 'playing-false'" alt="" />
          <div class="drag" ref="drag"></div>
        </div>
        <play-list ref="playList"></play-list>
      </div>
    </div>
    <audio ref="player" autoplay crossOrigin="anonymous"></audio>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import playerMusic from './player'
import OtherControl from './otherControl.vue'
import PlayList from './playList.vue'
import { silencePromise, timeToSec, retainNum, formatSeconds } from '~/utils/helper'
import config from '~/config'
import DragArc from '~/utils/dragAcr'

export default {
  data() {
    return {
      infoShow: false,
      musicReady: false, // Is it possible to use the player
      isPlaying: false,
      drag: null,
      isInit: true,
      dragFlag: false // Is it dragging
    }
  },
  components: {
    OtherControl,
    PlayList
  },
  computed: {
    ...mapGetters('music', [
      'audioEle',
      'playlist',
      'currentMusic',
      'playing',
      'historyList',
      'mode',
      'currentIndex',
      'currentTime',
      'allAuth',
      'userWorkIds',
      'audioUrl'
    ]),
    percent() {
      return this.currentTime / timeToSec(this.currentMusic.timing)
    },
    bgStyle() {
      return {
        background: `url('${this.currentMusic.cover}') center center no-repeat`,
        backgroundSize: '100% 100%'
      }
    },
    isPlayer() {
      return this.playlist.length > 0
    },
    getCurrentTime() {
      return formatSeconds(this.currentTime)
    },
    getTiming() {
      if (this.currentMusic) {
        return formatSeconds(timeToSec(this.currentMusic.timing))
      }
      return '00:00'
    }
  },
  created() {
    this.drag = null

  },
  mounted() {
    this.$nextTick(() => {
      this.setAudioEle(this.$refs.player)
      this.audioEle.volume = 0.8
      silencePromise(this.audioEle.play())
      this.audioEle.pause()
      silencePromise(this.audioEle.play())
      if (this.audioEle) {
        playerMusic.initAudio(this)
      } else {
        setTimeout(() => {
          playerMusic.initAudio(this)
        }, 500)
      }
    })
    document.addEventListener('click', () => {
      if (this.isInit) {
        silencePromise(this.audioEle.play())
      }
      this.isInit = false
    }, false)
  },
  watch: {
    currentMusic: {
      handler(newMusic, oldMusic) {
        if (!oldMusic) return
        if (!newMusic.audioUrl || newMusic.tokenId === oldMusic.tokenId) return
        this.setCurrentTime(0)
        this.setPlaying(false)
        this.$refs.contentBg.style.background = `url('${newMusic.cover}') center center no-repeat`
        this.$refs.contentBg.style.backgroundSize = `cover`
        if (this.drag) {
          this.drag.setValue(0)
        }
        this.selectMusicUrl(newMusic.audioUrl)
      },
      immediate: true,
      deep: true
    },
    playing(newPlaying) {
      const audio = this.audioEle
      this.$nextTick(() => {
        if (newPlaying) {
          silencePromise(audio.play())
        } else {
          audio.pause()
        }
        this.isPlaying = true
        this.musicReady = true
      })
    },
    percent(val) {
      if (!this.dragFlag && !this.audioLoading) {
        const value = retainNum(val * 100)
        if (this.drag) {
          this.drag.setValue(value)
        }
      }
    },
    playlist: {
      handler(newList) {
        if (!this.drag && newList.length > 0) {
          this.initDrag()
          this.musicReady = true
        }
      },
      immediate: true
    }
  },
  methods: {
    ...mapActions('music', {
      setHistory: 'setHistory',
      setPlaying: 'setPlaying',
      selectPlayUrl: 'selectPlayUrl'
    }),
    ...mapMutations('music', {
      setAudioEle: 'SET_AUDIOELE',
      setCurrenIndex: 'SET_CURRENTINDEX',
      setCurrentTime: 'SET_CURRENTTIME'
    }),
    initDrag() {
      this.$nextTick(() => {
        this.drag = new DragArc({
          el: this.$refs.drag,
          startDeg: 1.5,
          endDeg: 3.5,
          outColor: '#eee',
          textShow: false,
          value: 0,
          slider: 5,
          innerLineWidth: 10,
          outLineWidth: 5,
          counterclockwise: false,
          change: (v) => {
            this.dragFlag = true
            this.progressMusic(retainNum(v / 100))
          },
          changeEnd: (v) => {
            this.dragFlag = true
            this.progressMusicEnd(retainNum(v / 100))
          },
          // 点击圆内触发事件
          inCircleCallback: () => {
            this.toggleInfoShow()
          }
        })
      })
    },
    handlePlay() {
      if (!this.musicReady) {
        return
      }
      this.setPlaying(!this.playing)
    },
    // prev: Is it the last song
    play(prev) {
      if (!this.musicReady) {
        return
      }
      const len = this.playlist.length
      if (!len) return
      const index = this.currentIndex
      let nextIndex = -1
      if (this.mode === config.playMode[2]) {
        nextIndex = Math.floor(Math.random() * this.playlist.length)
      } else {
        if (index > -1) {
          nextIndex = prev ? (index - 1 + len) % len : (index + 1) % len
        } else {
          nextIndex = 0
        }
      }
      this.setCurrenIndex(nextIndex)
    },
    selectMusicUrl(audioUrl) {
      this.audioEle.src = audioUrl
      this.setCurrentTime(0)
      this.audioLoading = false
      this.setPlaying(true)
      if (this.isPlaying) {
        this.musicReady = true
        silencePromise(this.audioEle.play())
      }
    },
    toggleList() {
      this.$refs.playList.toggleList()
    },
    toggleInfoShow() {
      this.infoShow = !this.infoShow
      this.$refs.playList.hideList()
    },
    playNextMusic() {
      if (!this.musicReady) {
        return
      }
      this.setCurrentTime(0)
      this.audioEle.currentTime = 0
      musicLog.addItem()
      switch (this.mode) {
        case config.playMode[0]: {
          const len = this.playlist.length
          if (!len) return
          const index = this.currentIndex
          const nextIndex = (index + 1) % len
          this.setCurrenIndex(nextIndex)
          this.setPlaying(true)
          return
        }
        case config.playMode[1]: {
          this.audioEle.currentTime = 0
          silencePromise(this.audioEle.play())
          this.setPlaying(true)
          return
        }
        case config.playMode[2]: {
          const len = this.playlist.length
          if (!len) return
          let randomIdx = Math.floor(Math.random() * len)
          const index = this.currentIndex
          if (randomIdx === index) randomIdx = (index + 1) % len
          this.setCurrenIndex(randomIdx)
          this.setPlaying(true)

          return
        }
        default:
          return
      }
    },
    progressMusic(percent) {
      this.setCurrentTime(timeToSec(this.currentMusic.timing) * percent)
    },
    progressMusicEnd(percent) {
      this.setCurrentTime(timeToSec(this.currentMusic.timing) * percent)
      this.audioEle.currentTime = timeToSec(this.currentMusic.timing) * percent

      this.dragFlag = false
    }
  }
}
</script>

<style scoped lang="scss">
div {
  box-sizing: border-box;
}
.player {
  width: 100px;
  height: 100px;
  position: fixed;
  right: 20px;
  bottom: 50px;
  z-index: 1000;
  transition: all 0.5s;
  user-select: none;
  .player-content {
    position: relative;
    .content {
      width: 440px;
      height: 80px;
      position: absolute;
      z-index: 9;
      top: 10px;
      right: 20px;
      @media screen and (max-width: 640px) {
        width: 320px;
      }
      .content-box {
        position: relative;
        width: 100%;
        height: 100%;
        padding: 18px 30px;
        background: #101010;
        border: 1px solid #1d1d1d;
        border-radius: 40px;
      }
      .content-bg-nav {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        .content-bg {
          // position: absolute;
          // top: 0;
          // right: 10px;
          // width: 70%;
          // height: 100%;
          // opacity: 0.2;
          // z-index: 1;
          position: absolute;
          width: 280px;
          height: 280px;
          top: -100px;
          right: 10px;
          // margin-top: -60px;
          opacity: 0.2;
          z-index: 1;
          .mask {
            position: absolute;
            top: 50%;
            left: 0;
            margin-top: -42px;
            width: 90px;
            height: 80px;
            background: linear-gradient(-90deg, rgba(19, 19, 19, 0), #101010 90px, #080808);
          }
        }
      }

      .content-info {
        position: relative;
        z-index: 8;
      }
      .title {
        font-size: 14px;
        font-weight: 500;
        text-align: left;
        color: #ffffff;
        line-height: 16px;
        max-width: 300px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .control-btn {
        display: flex;
        align-items: center;
        margin-top: 14px;
        .pointer {
          width: 20px;
          height: 20px;
          line-height: 20px;
          text-align: center;
          margin-right: 18px;
          cursor: pointer;
          &.order {
            width: 13px;
            height: 13px;
          }
        }
        .play-time {
          span {
            font-size: 12px;
            text-align: left;
            color: #a4a4a4;
            line-height: 14px;
          }
        }
      }
    }
  }
  .img-nav {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    position: relative;

    background: #2c2c2c;
    z-index: 99;
    .drag {
      position: absolute;
      z-index: 10;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 110px;
      height: 110px;
      overflow: hidden;
    }
    img {
      width: 100%;
      height: 100%;
      box-sizing: border-box;
      padding: 5px;
      border-radius: 50%;
      background: #2c2c2c;
      animation: cdRotate 30s linear infinite;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden; // 解决在使用animation动画时，页面出现抖动的问题
      -webkit-animation-play-state: paused;
      animation-play-state: paused;
      transform-origin: 50% 50%;
      &.playing-false {
        animation-play-state: paused;
      }
      &.playing-true {
        animation-play-state: running;
      }
    }
  }
}
@keyframes fadeInRight {
  from {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }

  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeOutRight {
  from {
    opacity: 1;
  }

  to {
    opacity: 0;
    -webkit-transform: translate3d(100%, 0, 0);
    transform: translate3d(100%, 0, 0);
  }
}
.fadeInRight {
  animation-name: fadeInRight;
}
.fadeOutRight {
  animation-name: fadeOutRight;
}
@keyframes cdRotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(1turn);
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.animated {
  animation-duration: 0.8s; //动画持续时间
  // animation-delay: 1s !important; //动画延迟时间
}
</style>
