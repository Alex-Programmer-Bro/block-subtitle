import antdCss from 'antd/dist/antd.css?inline';
import root from "react-shadow";
import keyboardCss from 'react-simple-keyboard/build/css/index.css?inline';
import { Mode } from './component/mode';
import styles from "./content.css?inline";
import { useDraggable } from "./hook/useDraggable";
import { usePressing } from "./hook/usePressing";

const Main = () => {
  const { containerRef, setBlock } = useDraggable();
  const pressing = usePressing();

  return (
    <>
      <div className="container">
        <div className={`hello ${pressing ? "pressing" : ""}`} ref={containerRef} />
      </div>
      <Mode setBlock={setBlock} />
    </>
  );
};

export const App = () => {
  return (
    <root.div mode="open">
      <style type="text/css">{antdCss}</style>
      <style type="text/css">{styles}</style>
      <style type='text/css'>{keyboardCss}</style>
      <Main />
    </root.div>
  );
};


