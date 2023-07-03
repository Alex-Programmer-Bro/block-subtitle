import React from "react";
import root from "react-shadow";
import styles from "./content.css";

export const App = () => {
  return (
    <root.div mode="closed">
      <style type="text/css">{styles}</style>
      <div className="hello">123</div>
    </root.div>
  );
};
