export interface IPagi {
  skip?: number,
  limit?: number,
}

export interface IOrder {
  order_by?: string,
  order?: -1 | 1,
}

export interface IFilter {
  [key: string]: string | number,
}

export type IQuery = IPagi & IOrder & IFilter
