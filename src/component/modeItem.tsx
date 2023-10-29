import { Button, Input, Popover, Radio } from "antd";
import { PrimitiveAtom, useAtom } from "jotai";
import { useRef } from "react";
import Keyboard from "react-simple-keyboard";

export const ModeItem = ({ recordAtom, remove }: { recordAtom: PrimitiveAtom<RecordItem>; remove: () => void }) => {
  const containerRef = useRef(null);
  const [record, setRecord] = useAtom(recordAtom);

  const onRemove = () => {
    remove();
  };

  const content = (
    <Keyboard
      onKeyPress={(v) => {
        setRecord((pre) => ({ ...pre, shortcuts: v }));
      }}
    />
  );

  return (
    <div className="record" ref={containerRef}>
      <Radio value={record.id}>
        <Input
          type="text"
          placeholder="Description"
          defaultValue={record.title}
          onChange={(e) => {
            setRecord((old) => {
              return {
                ...old,
                title: e.target.value,
              };
            });
          }}
        />
      </Radio>
      <div className="action">
        {
          <Popover
            destroyTooltipOnHide
            showArrow={false}
            overlayInnerStyle={{ width: 600 }}
            getPopupContainer={() => containerRef.current!}
            content={content}
            style={{ width: 500 }}
            title="Set keyboard shorcuts"
            placement="bottom"
            trigger={["click"]}
          >
            {record.shortcuts ? (
              <Button>{record.shortcuts}</Button>
            ) : (
              <Button
                icon={
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                    />
                  </svg>
                }
              />
            )}
          </Popover>
        }
        <Button
          onClick={onRemove}
          type="primary"
          danger
          icon={
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          }
        ></Button>
      </div>
    </div>
  );
};
