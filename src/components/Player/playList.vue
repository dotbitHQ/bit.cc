<template>
  <div class="play-list" v-show="playShow">
    <transition enter-active-class="fadeInUp" leave-active-class="fadeOutDown">
      <div class="play-list-box animated" v-show="listShow">
        <div class="title">
          <div class="title-left">
            <img src="/imgs/kolo/icon-close.svg" alt="" class="close" @click="toggleList" />
            <p>Playlist</p>
          </div>
          <div class="title-right" @click="handleClear">
            <img src="/imgs/kolo/icon-remove.svg" alt="" class="remove" />
            <p>Clear</p>
          </div>
        </div>
        <div class="list">
          <div class="item" v-for="(item, index) in playlist" :key="index">
            <div class="l" @click="handleItem(index)">
              <img v-show="getPlaying(index) && playing" src="/imgs/kolo/icon-mini-pause.svg" alt="" class="control" />
              <img v-show="!(getPlaying(index) && playing)" src="/imgs/kolo/icon-mini-play.svg" alt="" class="control" />
              <div class="info" :class="getPlaying(index) && playing ? 'active' : ''">
                <p class="name">{{ item.title }}</p>
                <div class="music-name-nav">
                  <p class="music-name">{{ item.workTitle }}</p>
                </div>
              </div>
            </div>
            <div class="r">
              <p class="duration">{{ getTiming(item.timing) }}</p>
              <img src="/imgs/kolo/icon-remove.svg" alt="" class="remove" @click="handleRemoveItem(index)" />
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex'
import { timeToSec, formatSeconds } from '~/utils/helper'
export default {
  data() {
    return {
      listShow: false,
      playShow: false,
      timer: null
    }
  },
  computed: {
    ...mapGetters('music', ['currentIndex', 'playlist', 'playing']),

  },
  watch: {
    listShow(value) {
      clearTimeout(this.timer)
      if (value) {
        this.playShow = true
      } else {
        this.timer = setTimeout(() => {
          this.playShow = false
        }, 300)
      }
    }
  },
  methods: {
    ...mapActions('music', ['removerPlayListItem', 'clearPlayList']),
    ...mapMutations('music', {
      setPlaying: 'SET_PLAYING',
      setCurrenIndex: 'SET_CURRENTINDEX',
      setCurrentTime: 'SET_CURRENTTIME'
    }),
    getPlaying(index) {
      return this.currentIndex === index
    },
    handleItem(index) {
      this.currentIndex === index ? this.setPlaying(!this.playing) : this.setCurrenIndex(index)
    },
    handleClear() {
      this.clearPlayList()
      this.hideList()
    },
    handleRemoveItem(index) {
      this.removerPlayListItem({
        list: JSON.parse(JSON.stringify(this.playlist)),
        index
      })
    },
    toggleList() {
      this.listShow = !this.listShow
    },
    hideList() {
      this.listShow = false
    },
    getTiming(timing) {
      if (timing) {
        return formatSeconds(timeToSec(timing))
      }
      return '00:00'
    }
  }
}
</script>

<style scoped lang="scss">
.play-list {
  overflow: hidden;
  position: absolute;
  width: 400px;
  height: 430px;
  bottom: 60px;
  right: 30px;
  transition: all 3s;

  .play-list-box {
    position: relative;
    width: 100%;
    height: 100%;
    background: #101010;
    border: 1px solid #181818;
    border-radius: 10px 10px 0 0;
  }
  .title {
    padding: 0 20px;
    height: 52px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 12px;
      color: #a4a4a4;
    }
    .title-left {
      height: 100%;
      display: flex;
      align-items: center;
      .close {
        width: 20px;
        height: 20px;
        cursor: pointer;
        &:hover {
          color: #ff7f00 !important;
        }
      }
      p {
        margin-left: 12px;
      }
    }
    .title-right {
      height: 100%;
      display: flex;
      align-items: center;
      cursor: pointer;
      .remove {
        width: 14px;
        height: 14px;
      }
      p {
        margin-left: 8px;
      }
      &:hover {
        font {
          color: #ff7f00;
        }
        .remove {
          color: #ff7f00 !important;
        }
      }
    }
  }
  .list {
    max-height: 350px;
    overflow-y: auto;
    overflow-x: hidden;
    padding-bottom: 20px;
    &::-webkit-scrollbar {
      width: 4px;
      height: 14px;
      background-color: #101010;
    }

    &::-webkit-scrollbar-thumb {
      background: #212121;
      border-radius: 4px;
      box-shadow: 2px 2px 8px 0px rgba(0, 0, 0, 0.16);
    }

    &::-webkit-scrollbar-track {
      background-color: transparent;
    }
    .item {
      height: 60px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      &:nth-child(odd) {
        background: #181818;
      }
      .control {
        width: 18px;
        height: 18px;
        cursor: pointer;
      }
      .remove {
        width: 14px;
        height: 14px;
        cursor: pointer;
        &:hover {
          color: #ff7f00 !important;
        }
      }
      .l,
      .r {
        display: flex;
        align-items: center;
      }
      .l {
        cursor: pointer;
        .info {
          margin-left: 12px;
          &.active {
            .name,
            .music-name {
              color: #ff7f00;
            }
          }
        }
        .name {
          font-size: 14px;
          color: #a4a4a4;
          line-height: 16px;
          max-width: 240px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        .music-name {
          margin-top: 4px;
          font-size: 12px;
          text-align: left;
          color: #676767;
          max-width: 240px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          line-height: 14px;
        }
      }
      .r {
        p {
          margin-right: 18px;
          font-size: 14px;
          color: #a4a4a4;
          line-height: 16px;
        }
      }
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
  to {
    opacity: 1;
    -webkit-transform: translate3d(0, 0, 0);
    transform: translate3d(0, 0, 0);
  }
}
@keyframes fadeOutDown {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
    -webkit-transform: translate3d(0, 100%, 0);
    transform: translate3d(0, 100%, 0);
  }
}
.fadeInUp {
  -webkit-animation-name: fadeInUp;
  animation-name: fadeInUp;
}
.fadeOutDown {
  -webkit-animation-name: fadeOutDown;
  animation-name: fadeOutDown;
}
.animated {
  animation-duration: 0.5s; //动画持续时间
  // animation-delay: 1s !important; //动画延迟时间
}
</style>
