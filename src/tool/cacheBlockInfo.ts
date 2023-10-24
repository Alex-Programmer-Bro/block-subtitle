const cacheKey = location.origin;

export const getCache = () => {
  try {
    return JSON.parse(localStorage.getItem(cacheKey)!);
  } catch (error) {
    return null
  }
}

export const setCache = (data: CacheBlockInfo) => {
  return localStorage.setItem(cacheKey, JSON.stringify(data));
}
