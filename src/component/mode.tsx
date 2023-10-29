import type { RadioChangeEvent } from "antd";
import { Button, Drawer, Radio } from "antd";
import { useAtom } from "jotai";
import { useState } from "react";
import useKeyboardShortcut from "use-keyboard-shortcut";
import { v1 } from "uuid";
import { ModeItem } from "../component/modeItem";
import { activeRecrod, recordListAtom } from "../store/record";
import { getCache } from "../tool/cacheBlockInfo";

export const Mode = ({ setBlock }: { setBlock: (data: CacheBlockInfo) => void }) => {
  const [recordList, dispatch] = useAtom(recordListAtom);
  const [active, setActive] = useAtom(activeRecrod);
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

  const onAddRecord = () => {
    const newRecord = {
      id: v1(),
      title: "",
      block: getCache(),
    };

    dispatch({
      type: "insert",
      value: newRecord,
    });
  };

  const onReset = () => {
    setBlock(getCache());
    setActive('');
  };

  return (
    <div className="mode">
      <Drawer
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
            <Button type="primary" onClick={onAddRecord}>
              + Add Record
            </Button>
          </div>
        }
      >
        <Radio.Group onChange={onChange} value={active} size="large">
          {recordList.map((item, i) => {
            return (
              <ModeItem
                key={i}
                recordAtom={item}
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
