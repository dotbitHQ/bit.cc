import { IncomingMessage } from 'connect'
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import { Context } from '@nuxt/types'
import { ILanguageOption, LANGUAGE, LanguageOptions } from '~/constant'
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
 * @param languageOptions {ILanguageOption[]}
 * @param defaultLanguage {string]}
 */
export function matchLanguage (acceptLanguage: string, languageOptions: ILanguageOption[], defaultLanguage: string): ILanguageOption {
  const languageList = acceptLanguage.split(',')

  let language = defaultLanguage

  languageList.some((lang: string) => {
    return languageOptions.some((option) => {
      if (lang.match(option.matcher)) {
        language = option.value

        return true
      }
      return false
    })
  })

  return languageOptions.find(option => option.value === language) as ILanguageOption
}

function resolveLanguageFromRequest (req: IncomingMessage): ILanguageOption {
  const langs = req.headers['accept-language']?.split(',').map(accept => accept.split(';')[0]).join(',') || ''

  return matchLanguage(langs, LanguageOptions, LANGUAGE.en)
}

export default async ({ app, store, route, req }: Context, inject: Function): Promise<void> => {
  const lang: ILanguageOption = process.server ? resolveLanguageFromRequest(req) : store.getters[configKeys.computedLanguage]

  const translations = await import(`~/locales/${lang.value}.json`)

  app.i18n = new VueI18n({
    locale: lang.value,
    fallbackLocale: 'en',
    messages: {
      [lang.value]: translations,
    }
  })

  // we can't override vue-i18n's $t, inject $tt instead
  inject('tt', (key: string, params?: any) => {
    key = makeCrcKey(key)
    // @ts-expect-error
    return app.i18n.t(key, params)
  })

  if (process.browser) {
    window.i18n = app.i18n
  }
}
