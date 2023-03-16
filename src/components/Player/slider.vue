<template>
  <div ref="koloProgress" class="koloProgress" @click="barClick">
    <div class="koloProgress-bar"></div>
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
    percent: {
      type: [Number],
      default: 0
    }
  },
  data() {
    return {
      move: {
        status: false,
        startY: 0,
        bottom: 0
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
    // binding event
    bindEvents() {
      document.addEventListener('mousemove', this.barMove)
      document.addEventListener('mouseup', this.barUp)

      document.addEventListener('touchmove', this.barMove)
      document.addEventListener('touchend', this.barUp)
    },
    // bind event
    unbindEvents() {
      document.removeEventListener('mousemove', this.barMove)
      document.removeEventListener('mouseup', this.barUp)

      document.removeEventListener('touchmove', this.barMove)
      document.removeEventListener('touchend', this.barUp)
    },
    // click event
    barClick(e) {
      let rect = this.$refs.koloProgress.getBoundingClientRect()
      let offsetHeight = Math.min(this.$refs.koloProgress.clientHeight - dotHeight, Math.max(0, rect.bottom - e.clientY))
      this.moveSlide(offsetHeight)
      this.covoitPercent(true)
    },
    // mouse down event
    barDown(e) {
      this.move.status = true
      this.move.startY = e.clientY || e.touches[0].pageY
      this.move.bottom = this.$refs.koloProgressInner.clientHeight
    },
    // Mouse/touch move events
    barMove(e) {
      if (!this.move.status) {
        return false
      }
      e.preventDefault()
      let endY = e.clientY || e.touches[0].pageY
      let dist = this.move.startY - endY
      let offsetHeight = Math.min(this.$refs.koloProgress.clientHeight - dotHeight, Math.max(0, this.move.bottom + dist))
      if (offsetHeight > 0) {
        this.moveSlide(offsetHeight)
        this.covoitPercent()
      }
    },
    // mouse/touch release event
    barUp(e) {
      if (this.move.status) {
        this.covoitPercent(true)
        this.move.status = false
      }
    },
    // move slider
    moveSlide(offsetHeight) {
      this.$refs.koloProgressInner.style.height = `${offsetHeight}px`
    },
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
