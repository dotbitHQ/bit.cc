import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Context } from '@nuxt/types'
import { ILanguageOption } from '~/constant'
import { configKeys } from '~/store/config'
// @ts-expect-error
import { makeCrcKey } from 'i18n-abc/lib/shared.js'

Vue.use(VueI18n)

/**
 * vue-i18n
 * @param key
 * @param params
 */
export function $tt (key: string, params?: any): string {
  key = makeCrcKey(key)
  return window.i18n.t(key, params)
}
/**
 * Match users language with the languages we supported
 * @param acceptLanguage {string} comma split string
 * @param LanguageOptions {ILanguageOption[]}
 * @param defaultLanguage {string]}
 */
export function matchLanguage (acceptLanguage: string, LanguageOptions: ILanguageOption[], defaultLanguage: string): any {
  const languageList = acceptLanguage.split(',')

  let language = defaultLanguage

  languageList.some((lang: string) => {
    return LanguageOptions.some((option) => {
      if (lang.match(option.matcher)) {
        language = option.value

        return true
      }
      return false
    })
  })

  return language
}

export default async ({ app, store, route }: Context, inject: Function) => {
  const lang: ILanguageOption = store.getters[configKeys.computedLanguage]

  const translations = await import(`~/locales/${lang.value}.json`)

  app.i18n = new VueI18n({
    locale: lang.value,
    fallbackLocale: 'en',
    messages: {
      [lang.value]: translations,
    }
  })

  // we can't override vue-i18n's $t, inject $tt instead
  inject('tt', $tt)

  window.i18n = app.i18n
}
