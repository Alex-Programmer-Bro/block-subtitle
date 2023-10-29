declare module "*.css";

declare module "*.css?inline";

type CacheBlockInfo = {
  width: number;
  height: number;
  x: number;
  y: number;
};

type ModeItem = {
  id: string;
  title: string;
  block: CacheBlockInfo;
  shortcuts?: string;
};
