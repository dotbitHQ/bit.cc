<template>
  <div class="other-control">
    <div class="volume-control">
      <img class="volume-img" :src="volumeImg" alt="" @click="handleMute" />
      <div class="volume-slider-nav">
        <div class="volume-slider">
          <Slider :percent="volume" @percentChange="volumeInput" @percentChangeEnd="volumeChange"></Slider>
        </div>
      </div>
    </div>
    <div class="mode-control" @click="changeMode">
      <img :src="`/imgs/kolo/icon-${mode}.svg`" alt="" class="mode" />
    </div>
    <div class="history-control" @click="toggleList">
      <img src="/imgs/kolo/icon-gedan.svg" alt="" class="mode" />
      <div class="num" v-show="playlistLen > 0">{{ playlistLen }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import config from '~/config'
import Slider from './slider.vue'
export default {
  data() {
    return {
      volumeNum: 3,
      volumeImgs: [
        require('~/static/imgs/kolo/24gl-volumeCross.svg'),
        require('~/static/imgs/kolo/24gl-volumeZero.svg'),
        require('~/static/imgs/kolo/24gl-volumeLow.svg'),
        require('~/static/imgs/kolo/24gl-volumeMiddle.svg'),
        require('~/static/imgs/kolo/24gl-volumeHigh.svg')
      ]
    }
  },
  components: {
    Slider
  },
  computed: {
    ...mapGetters('music', ['mode', 'playlist', 'audioEle', 'volume']),
    playlistLen() {
      return this.playlist.length
    },
    volumeImg() {
      return this.volumeImgs[this.volumeNum]
    }
  },
  watch: {
    volume: {
      handler(newVolume) {
        if (newVolume > 0.8) this.volumeNum = 4
        else if (newVolume > 0.4) this.volumeNum = 3
        else if (newVolume > 0.1) this.volumeNum = 2
        else if (newVolume <= 0.1 && newVolume > 0) this.volumeNum = 1
        else this.volumeNum = 0
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    ...mapActions('music', ['setPlayMode', 'setVolume', 'setVolumeChange', 'setVolumeMute']),
    changeMode() {
      const len = config.playMode.length
      const index = config.playMode.findIndex((item) => item === this.mode)
      const nextIndex = (index + 1) % len
      this.setPlayMode(config.playMode[nextIndex])
    },
    toggleList() {
      this.$emit('toggleList')
    },
    volumeInput(e) {
      this.audioEle.volume = e
      this.setVolume(e)
    },
    volumeChange(e) {
      if (e > 0) {
        this.setVolumeChange(e)
      }
    },
    handleMute() {
      if (this.volume > 0) {
        this.setVolumeMute(true)
      } else {
        this.setVolumeMute(false)
      }
      this.audioEle.volume = this.volume
    }
  }
}
</script>

<style scoped lang="scss">
.other-control {
  position: absolute;
  right: 74px;
  top: 28px;
  display: flex;
  align-items: center;
  @media screen and (max-width: 640px) {
    display: none;
  }
}
.volume-control,
.mode-control,
.history-control {
  // display: inline-block;
  cursor: pointer;
}
.mode {
  width: 20px;
  height: 20px;
}
.volume-control {
  width: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .volume-img {
    display: block;
    height: 18px;
    width: auto;
  }
  &:hover {
    .volume-slider-nav {
      display: block;
    }
  }
  .volume-slider-nav {
    position: absolute;
    display: none;
    bottom: 100%;
    left: 0;
    width: 25px;
    height: 80px;
    padding-bottom: 20px;
  }
  .volume-slider {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    &::v-deep {
      .el-slider__runway {
        background-color: #2c2c2c;
      }
      .el-slider__button-wrapper {
        width: 14px;
        height: 14px;
      }
      .el-slider__button {
        width: 14px;
        height: 14px;
      }
      .el-slider.is-vertical .el-slider__button-wrapper {
        left: -4px;
      }
    }
  }
}
.mode-control {
  margin-left: 14px;
}
.history-control {
  margin-left: 16px;
  position: relative;
  .num {
    position: absolute;
    right: -10px;
    top: -10px;
    background: #ff3333;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    line-height: 20px;
    text-align: center;
    color: #fff;
    font-size: 12px;
    user-select: none;
  }
}
</style>
