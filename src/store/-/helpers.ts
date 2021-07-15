/**
 * Enhance keys in vuex module，as all of those modules have namespace，so namespace must be added if .vue files need to use it.。
 * @param keys
 * @param prefix
 */
export function augmentKeys<T> (keys: T, prefix: string): T {
  const ret: any = {}

  for (const key in keys) {
    if (!Object.prototype.hasOwnProperty.call(keys, key)) continue

    ret[key] = `${prefix}/${keys[key]}`
  }

  return ret
}
