import { DirectiveOptions } from 'vue'

const defaultOption = {
  delay: 200,
  minSize: 16,
  maxSize: 40,
}

declare global {
  interface HTMLElement {
    __ctx: typeof defaultOption,
    __debounceHandler: () => void,
  }
}

const debounce = function (func: Function, wait: number, immediate?: boolean): () => void {
  let timeout = 0
  return function () {
    const args = arguments
    const later = function (): void {
      timeout = 0
      if (!immediate) func.apply(null, args)
    }

    const callNow = immediate && !timeout
    clearTimeout(timeout)
    // @ts-expect-error
    timeout = setTimeout(later, wait)
    if (callNow) func.apply(null, args)
  }
}

const onResize = function (element: HTMLElement): void {
  const ctx = element.__ctx
  const $parent = element.parentElement

  if ($parent) {
    const parentStyle = getComputedStyle($parent)
    const elementStyle = getComputedStyle(element)
    const availableWidth = $parent.clientWidth - parseFloat(parentStyle.paddingLeft) - parseFloat(parentStyle.paddingRight) - parseFloat(parentStyle.borderLeftWidth) - parseFloat(parentStyle.borderRightWidth)

    const currentWidth = element.scrollWidth

    const previousFontSize = parseFloat(elementStyle.fontSize)

    const size = Math.min(
      Math.max(ctx.minSize, (availableWidth / currentWidth) * previousFontSize),
      ctx.maxSize
    )

    element.style.whiteSpace = size <= ctx.minSize ? 'normal' : 'nowrap'
    element.style.fontSize = `${size}px`
  }
}

const directive: DirectiveOptions = {
  inserted (el, binding) {
    const option = binding.value
    const ctx = {
      ...defaultOption,
      ...option
    }

    el.__ctx = ctx

    el.__debounceHandler = debounce(function () {
      onResize(el)
    }, ctx.delay)

    if (typeof window !== 'undefined') {
      window.addEventListener('resize', el.__debounceHandler, { passive: true })
    }
    onResize(el)
  },

  unbind (el) {
    if (typeof window !== 'undefined') {
      window.removeEventListener('resize', el.__debounceHandler)
    }
  }
}

export default directive
