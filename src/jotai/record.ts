import { atomWithStorage, splitAtom } from "jotai/utils";

export const activeRecrod = atomWithStorage<string>("block-subtitle-active-record", '');

export const recordListByCacheAtom = atomWithStorage<RecordItem[]>("block-subtitle-record-list", []);

export const recordListAtom = splitAtom(recordListByCacheAtom);
