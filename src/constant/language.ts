import { IOption } from '~/constant/index'

export interface ILanguageOption extends IOption {
  matcher: RegExp,
}

export const LANGUAGE = {
  en: 'en',
  zhCN: 'zh-CN',
  zhTW: 'zh-TW',
  jp: 'jp',
  ko: 'ko'
}

export const LanguageOptions: ILanguageOption[] = [{
  text: 'English',
  value: LANGUAGE.en,
  matcher: /en/i
}, {
  text: '简体中文',
  value: LANGUAGE.zhCN,
  matcher: /(^zh$|cn|hans)/i
}, {
  text: '繁体中文',
  value: LANGUAGE.zhTW,
  matcher: /hk|tw|hant/i
}, {
  text: '日本語',
  value: LANGUAGE.jp,
  matcher: /ja|jp/i
}, {
  text: '한국어',
  value: LANGUAGE.ko,
  matcher: /ko/i
}]
