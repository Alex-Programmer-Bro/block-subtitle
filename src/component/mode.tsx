import type { RadioChangeEvent } from 'antd';
import { Button, Drawer, Radio } from 'antd';
import { useAtom } from 'jotai';
import { useState } from 'react';
import useKeyboardShortcut from 'use-keyboard-shortcut';
import { v1 } from 'uuid';
import { ModeItem } from '../component/modeItem';
import { activeRecrod, recordListAtom } from '../store/record';
import { getCache } from "../tool/cacheBlockInfo";

export const Mode = ({ setBlock }: { setBlock: (data: CacheBlockInfo) => void }) => {
  const [recordList, dispatch] = useAtom(recordListAtom);
  const [active, setActive] = useAtom(activeRecrod);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(1);

  useKeyboardShortcut(
    ["Shift", "R"],
    () => setOpen(true),
    {
      overrideSystem: true,
      ignoreInputFields: false,
      repeatOnHold: false
    }
  );

  const onChange = (e: RadioChangeEvent) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  }

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const onAddRecord = () => {
    const newRecord = {
      id: v1(),
      title: 'hello',
      block: getCache()
    }

    dispatch({
      type: 'insert',
      value: newRecord
    });

    setActive(newRecord);
  }

  const onReset = () => {
    setBlock(getCache());
  }

  return <div className="mode">
    <Drawer title="Set Mode" placement="left" onClose={onClose} open={true} getContainer={false} footer={
      <div className='footer'>
        <Button type='default' onClick={onReset}>Reset</Button>
        <Button type='primary' onClick={onAddRecord}>+ Add Record</Button>
      </div>
    }>
      <Radio.Group onChange={onChange} value={value} size='large'>
        {
          recordList.map((item, i) => {
            return <ModeItem
              key={i}
              recordAtom={item}
              remove={() => {
                dispatch({ type: 'remove', atom: item })
              }}
            />
          })
        }
      </Radio.Group>
    </Drawer>
  </div>
}
