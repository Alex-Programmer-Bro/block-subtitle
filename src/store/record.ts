import { atom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";

export const activeRecrod = atomWithStorage<string>("block-subtitle-active-record", "");

export const recordListByCacheAtom = atomWithStorage<RecordItem[]>("block-subtitle-record-list", []);

export const recordListAtom = splitAtom(recordListByCacheAtom);

export const activeModeAtom = atom(get => {
  const activeRecord = get(activeRecrod);
  if (!activeRecord) return null;

  const list = get(recordListAtom);
  const target = list.find(item => get(item).id === activeRecord);
  if (!target) return null;

  return get(target);
})
