export interface KoloAssets {
  nftType: number;
  title: string;
  cover: string;
  timing: string;
  workId?: number;
  targetId: number;
  trackIndex: number;
  workIndex: number;
  audioUrl?: string;
  workTitle?: string;
  tokenId?: number;
  subNfts?: KoloNftAsset[];
}

export interface KoloNftAsset {
  nftType: number,
  title: string;
  cover: string;
  timing: string;
  workId: number,
  targetId: number,
  trackIndex: number,
  audioUrl: string;
  workTitle: string;
  workIndex: number
}
