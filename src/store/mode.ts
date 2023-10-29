import { atom } from "jotai";
import { atomWithStorage, splitAtom } from "jotai/utils";

export const activeModeId = atomWithStorage<string>("block-subtitle-active-record", "");

export const modeListByCacheAtom = atomWithStorage<ModeItem[]>("block-subtitle-record-list", []);

export const modeListAtom = splitAtom(modeListByCacheAtom);

export const activeModeAtom = atom(get => {
  const activeRecord = get(activeModeId);
  if (!activeRecord) return null;

  const list = get(modeListAtom);
  const target = list.find(item => get(item).id === activeRecord);
  if (!target) return null;

  return get(target);
})
