const cacheKey = location.origin;

const defaultValue: CacheBlockInfo = {
  width: 400,
  height: 100,
  x: 0,
  y: 0
}

export const getCache = (): CacheBlockInfo => {
  try {
    const cache = localStorage.getItem(cacheKey);
    if (!cache) return defaultValue;
    return JSON.parse(cache);
  } catch (error) {
    return defaultValue
  }
}

export const setCache = (data: CacheBlockInfo) => {
  return localStorage.setItem(cacheKey, JSON.stringify(data));
}
