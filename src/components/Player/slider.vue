<template>
  <!--进度条拖动-->
  <div ref="koloProgress" class="koloProgress" @click="barClick">
    <div class="koloProgress-bar"></div>
    <div ref="voPercentProgress" class="koloProgress-outer"></div>
    <div ref="koloProgressInner" class="koloProgress-inner">
      <div class="koloProgress-dot" @mousedown="barDown" @touchstart.prevent="barDown"></div>
    </div>
  </div>
</template>

<script>
const dotHeight = 10
export default {
  name: 'koloProgress',
  props: {
    // 进度值一
    percent: {
      type: [Number],
      default: 0
    },
    // 进度值二（歌曲缓冲进度用）
    percentProgress: {
      type: [Number],
      default: 0
    }
  },
  data() {
    return {
      move: {
        status: false, // 是否可拖动
        startY: 0, // 记录最开始点击的X坐标
        bottom: 0 // 记录当前已经移动的距离
      }
    }
  },
  watch: {
    percent(newPercent) {
      if (newPercent >= 0 && !this.move.status) {
        const barHeight = this.$refs.koloProgress.clientHeight - dotHeight
        const offsetHeight = newPercent * barHeight
        this.moveSlide(offsetHeight)
      }
    },
    percentProgress(newValue) {
      let offsetHeight = this.$refs.koloProgress.clientHeight * newValue
      this.$refs.voPercentProgress.style.height = `${offsetHeight}px`
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.bindEvents()
      const barHeight = this.$refs.koloProgress.clientHeight - dotHeight
      const offsetHeight = this.percent * barHeight
      this.moveSlide(offsetHeight)
    })
  },
  beforeDestroy() {
    this.unbindEvents()
  },
  methods: {
    // 添加绑定事件
    bindEvents() {
      document.addEventListener('mousemove', this.barMove)
      document.addEventListener('mouseup', this.barUp)

      document.addEventListener('touchmove', this.barMove)
      document.addEventListener('touchend', this.barUp)
    },
    // 移除绑定事件
    unbindEvents() {
      document.removeEventListener('mousemove', this.barMove)
      document.removeEventListener('mouseup', this.barUp)

      document.removeEventListener('touchmove', this.barMove)
      document.removeEventListener('touchend', this.barUp)
    },
    // 点击事件
    barClick(e) {
      let rect = this.$refs.koloProgress.getBoundingClientRect()
      console.log('rect.bottom', e.clientY, rect)
      let offsetHeight = Math.min(this.$refs.koloProgress.clientHeight - dotHeight, Math.max(0, rect.bottom - e.clientY))
      this.moveSlide(offsetHeight)
      this.covoitPercent(true)
    },
    // 鼠标按下事件
    barDown(e) {
      this.move.status = true
      this.move.startY = e.clientY || e.touches[0].pageY
      this.move.bottom = this.$refs.koloProgressInner.clientHeight
    },
    // 鼠标/触摸移动事件
    barMove(e) {
      if (!this.move.status) {
        return false
      }
      e.preventDefault()
      let endY = e.clientY || e.touches[0].pageY
      let dist = this.move.startY - endY
      let offsetHeight = Math.min(this.$refs.koloProgress.clientHeight - dotHeight, Math.max(0, this.move.bottom + dist))
      console.log('offsetHeight', offsetHeight)
      if (offsetHeight > 0) {
        this.moveSlide(offsetHeight)
        this.covoitPercent()
      }
    },
    // 鼠标/触摸释放事件
    barUp(e) {
      if (this.move.status) {
        this.covoitPercent(true)
        this.move.status = false
      }
    },
    // 移动滑块
    moveSlide(offsetHeight) {
      this.$refs.koloProgressInner.style.height = `${offsetHeight}px`
    },
    // 修改 percent
    covoitPercent(isEnd = false) {
      const { koloProgress, koloProgressInner } = this.$refs
      const lineHeight = koloProgress.clientHeight - dotHeight
      const percent = koloProgressInner.clientHeight / lineHeight
      this.$emit(isEnd ? 'percentChangeEnd' : 'percentChange', percent)
    }
  }
}
</script>

<style lang="scss" scoped>
.koloProgress {
  position: relative;
  padding: 8px 0;
  user-select: none;
  height: 100%;
  cursor: pointer;
  .koloProgress-bar {
    height: 100%;
    width: 6px;
    background: rgba(0, 0, 0, 0.8);
    border-radius: 6px;
    // background: linear-gradient(180deg, #ffee6a, #ff8800 33%, #ff7f00);
  }
  .koloProgress-outer {
    position: absolute;
    left: 50%;
    bottom: 5px;
    display: inline-block;
    width: 6px;
    height: 0;
    margin-top: -2px;
    background: rgba(255, 255, 255, 0.2);
  }
  .koloProgress-inner {
    position: absolute;
    left: 50%;
    bottom: 5px;
    display: inline-block;
    width: 6px;
    height: 64px;
    margin-left: -3px;
    border-radius: 6px;
    background: #ff7f00;
    background: linear-gradient(162deg, #ff7f00 16%, #ffb100);
    .koloProgress-dot {
      position: absolute;
      left: 50%;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background: #ff7f00;
      border: 1px solid #ffe3c7;
      border-radius: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
