import type { RadioChangeEvent } from "antd";
import { Button, Drawer, Radio } from "antd";
import { useAtom } from "jotai";
import { useState } from "react";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { v1 } from "uuid";
import { ModeItem } from "../component/modeItem";
import { activeModeId, modeListAtom } from "../store/mode";
import { getCache } from "../tool/cacheBlockInfo";

export const Mode = ({ setBlock }: { setBlock: (data: CacheBlockInfo) => void }) => {
  const [modeList, dispatch] = useAtom(modeListAtom);
  const [active, setActive] = useAtom(activeModeId);
  const [open, setOpen] = useState(false);

  useKeyboardShortcut(["Shift", "R"], () => setOpen(true), {
    overrideSystem: true,
    ignoreInputFields: false,
    repeatOnHold: false,
  });

  const onChange = (e: RadioChangeEvent) => {
    setActive(e.target.value);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onAddMode = () => {
    const newMode = {
      id: v1(),
      title: "",
      block: getCache(),
    };

    dispatch({
      type: "insert",
      value: newMode,
    });
  };

  const onReset = () => {
    setBlock(getCache());
    setActive('');
  };

  return (
    <div className="mode">
      <Drawer
        forceRender
        title="Set Mode"
        placement="left"
        onClose={onClose}
        open={open}
        getContainer={false}
        footer={
          <div className="footer">
            <Button type="default" onClick={onReset}>
              Reset
            </Button>
            <Button type="primary" onClick={onAddMode}>
              + Add Mode
            </Button>
          </div>
        }
      >
        <Radio.Group onChange={onChange} value={active} size="large">
          {modeList.map((item, i) => {
            return (
              <ModeItem
                key={i}
                modeAtom={item}
                remove={() => {
                  dispatch({ type: "remove", atom: item });
                }}
              />
            );
          })}
        </Radio.Group>
      </Drawer>
    </div>
  );
};
