export * from './language'

export interface IOption {
  text: string,
  value: string,
}

export const isProd = process.env.NODE_ENV === 'production'
