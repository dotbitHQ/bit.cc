import { Ref, ref, reactive } from '@nuxtjs/composition-api'

export function useKolo () {
  const kolo = reactive({
    volume: 0.8
  })

  function setVolume(val: number) {
    kolo.volume = val
    return val
  }
  return {
    kolo,
    setVolume
  }
}
