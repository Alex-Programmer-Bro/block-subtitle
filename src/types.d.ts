declare module "*.css";

declare module "*.css?inline";

type CacheBlockInfo = {
  width: number
  height: number
  x: number
  y: number
}

type RecordItem = {
  id: string;
  title: string;
  block: CacheBlockInfo;
  shortcuts?: string;
}
