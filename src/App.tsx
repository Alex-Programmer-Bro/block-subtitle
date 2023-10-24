import root from "react-shadow";
import styles from "./content.css?inline";
import { useDraggable } from "./hook/useDraggable";
import { usePressing } from "./hook/usePressing";

const InnerComponent = () => {
  const { containerRef } = useDraggable();
  const pressing = usePressing();

  return (
    <div className="container">
      <div className={`hello ${pressing ? "pressing" : ""}`} ref={containerRef} />
    </div>
  );
};

export const App = () => {
  return (
    <root.div mode="open">
      <style type="text/css">{styles}</style>
      <InnerComponent />
    </root.div>
  );
};
