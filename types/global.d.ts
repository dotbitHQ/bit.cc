/* eslint-disable @typescript-eslint/no-empty-interface */

// https://stackoverflow.com/a/39281228
interface StringTMap<T> {
  [key: string]: T,
}
interface NumberTMap<T> {
  [key: number]: T,
}

interface StringAnyMap extends StringTMap<any> {}
interface NumberAnyMap extends NumberTMap<any> {}

interface StringStringMap extends StringTMap<string> {}
interface NumberStringMap extends NumberTMap<string> {}

interface StringNumberMap extends StringTMap<number> {}
interface NumberNumberMap extends NumberTMap<number> {}

interface StringBooleanMap extends StringTMap<boolean> {}
interface NumberBooleanMap extends NumberTMap<boolean> {}

interface Window {
  i18n: any,
}

interface Error {
  code?: number,
}
