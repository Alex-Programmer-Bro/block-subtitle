import { useAtom } from "jotai";
import { recordListByCacheAtom } from "../jotai/record";

export const useKeyshortcuts = () => {
  const [shortcuts, setShortcuts] = useAtom(recordListByCacheAtom);

  const style = shortcuts
    .filter((item) => Boolean(item.shortcuts))
    .map((item) => `[data-skbtn="${item.shortcuts}"]`)
    .join(",");

  return {
    style,
  };
};
