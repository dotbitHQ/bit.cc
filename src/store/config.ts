import cookie from 'js-cookie'
import { Module } from 'vuex'
import { LANGUAGE, LanguageOptions } from '~/constant'
import { matchLanguage } from '~/plugins/i18n'
import { augmentKeys } from './-/helpers'
import { IRootState } from './index'

interface IState {
  language: string,
  version: string,
}

interface IKeys {
  // mutations
  setVersion: 'setVersion',
  setLanguage: 'setLanguage',
  // getters
  computedLanguage: 'computedLanguage',
}

const keys: IKeys = {
  // mutations
  setVersion: 'setVersion',
  setLanguage: 'setLanguage',
  // getters
  computedLanguage: 'computedLanguage',
}

const configStore: Module<IState, IRootState> = {
  state () {
    return {
      version: '0.0.1',
      language: '',
    }
  },
  mutations: {
    [keys.setVersion]: function (state, version): void {
      state.version = version
    }
  },
  getters: {
    [keys.computedLanguage]: function (state) {
      const ua = window.navigator.userAgent.match(/Language\/([a-zA-Z-_]+)/) // only for cctip Box
      const query = window.location.search.match(/[&?]lang=([a-zA-Z-_]+)/)
      const uaLanguage = ua && ua[1]
      const queryLanguage = query && query[1]
      const lang = matchLanguage(
        localStorage.getItem('lang') || cookie.get('lang') || state.language || queryLanguage || uaLanguage || window.navigator.language,
        LanguageOptions,
        LANGUAGE.en
      )
      return LanguageOptions.find(option => option.value === lang)
    }
  },
}

export {
  IState as IConfigState
}

export const configKeys = augmentKeys(keys, 'config')

export default configStore
