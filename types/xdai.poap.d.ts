export interface XdaiPoap {
  event: XdaiPoapEvent,
  tokenId: string,
  owner: string,
  created: string,
}

export interface XdaiPoapEvent {
  id: number,
  fancy_id: string,
  name: string,
  event_url: string,
  image_url: string,
  country: string,
  city: string,
  description: string,
  year: number,
  start_date: string,
  end_date: string,
  expiry_date: string,
  supply: number,
}
