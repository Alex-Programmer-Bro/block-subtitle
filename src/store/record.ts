import { atomWithStorage, splitAtom } from "jotai/utils";

export const activeRecrod = atomWithStorage<RecordItem | null>('block-subtitle-active-record', null)
export const recordListByCacheAtom = atomWithStorage<RecordItem[]>('block-subtitle-record-list', []);
export const recordListAtom = splitAtom(recordListByCacheAtom);
