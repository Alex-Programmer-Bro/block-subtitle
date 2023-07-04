import interact from "interactjs";
import React, { useEffect, useRef } from "react";
import root from "react-shadow";
import styles from "./content.css";
import { usePressing } from "./hook/usePressing";

const InnerComponent = () => {
  const ref = useRef<HTMLDivElement>(null);
  const pressing = usePressing();

  useEffect(() => {
    const target = ref.current!;
    const shadowRoot = target.getRootNode() as ShadowRoot;

    const cacheKey = location.origin;
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      const { width, height, x, y } = JSON.parse(cachedData);
      target.style.width = width + "px";
      target.style.height = height + "px";
      target.style.transform = `translate(${x}px, ${y}px)`;
      target.setAttribute("data-x", x);
      target.setAttribute("data-y", y);
      target.textContent = Math.round(width) + "\u00D7" + Math.round(height);
    }

    interact(target, { context: shadowRoot })
      .resizable({
        invert: "reposition",
        edges: { left: true, right: true, bottom: true, top: true },
        listeners: {
          move(event) {
            var target = event.target;
            var x = parseFloat(target.getAttribute("data-x")) || 0;
            var y = parseFloat(target.getAttribute("data-y")) || 0;

            target.style.width = event.rect.width + "px";
            target.style.height = event.rect.height + "px";

            x += event.deltaRect.left;
            y += event.deltaRect.top;

            target.style.transform = "translate(" + x + "px," + y + "px)";

            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);
            target.textContent = Math.round(event.rect.width) + "\u00D7" + Math.round(event.rect.height);

            const { width, height } = event.rect;
            const data = JSON.stringify({ width, height, x, y });
            localStorage.setItem(cacheKey, data);
          },
        },
        modifiers: [
          interact.modifiers.restrictEdges({
            outer: "parent",
          }),
          interact.modifiers.restrictSize({
            min: { width: 100, height: 10 },
          }),
        ],
        inertia: true,
      })
      .draggable({
        listeners: {
          move(event) {
            const target = event.target;
            const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
            const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
            target.style.transform = `translate(${x}px, ${y}px)`;
            target.setAttribute("data-x", x);
            target.setAttribute("data-y", y);

            const { width, height } = event.rect;
            const data = JSON.stringify({ width, height, x, y });
            localStorage.setItem(cacheKey, data);
          },
        },
        inertia: true,
        modifiers: [
          interact.modifiers.restrictRect({
            restriction: "parent",
            endOnly: true,
          }),
        ],
      });
  }, []);

  return (
    <div className="container">
      <div className={`hello ${pressing ? "pressing" : ""}`} ref={ref} />
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
