export interface Meta {
  total_count: number,
  max_page: number,
  current_page: number,
}

export interface TokenOutpoint {
  tx_hash: string,
  index: number,
}

export interface VerifiedInfo {
  is_verified?: any,
  verified_title: string,
  verified_source: string,
}

export interface JinseAsset {
  token_uuid: string,
  n_token_id: number,
  class_uuid: string,
  class_name: string,
  class_bg_image_url: string,
  renderer_type: string,
  class_description: string,
  class_total: string,
  class_issued: string,
  is_class_banned: boolean,
  tx_state: string,
  issuer_name: string,
  issuer_avatar_url: string,
  issuer_uuid: string,
  is_issuer_banned: boolean,
  from_address: string,
  to_address: string,
  token_outpoint: TokenOutpoint,
  verified_info: VerifiedInfo,
  class_likes: number,
}

export interface JinseAssetsRes {
  holder_address: string,
  meta: Meta,
  token_list: JinseAsset[],
}
