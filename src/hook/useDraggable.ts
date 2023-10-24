import interact from "interactjs";
import { useEffect, useRef } from "react";
import { getCache, setCache } from "../tool/cacheBlockInfo";

export const useDraggable = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const setBlock = ({ width, height, x, y }: CacheBlockInfo) => {
    const target = containerRef.current!;
    target.style.width = width + "px";
    target.style.height = height + "px";
    target.style.transform = `translate(${x}px, ${y}px)`;
    target.setAttribute("data-x", x.toString());
    target.setAttribute("data-y", y.toString());
    target.textContent = Math.round(width) + "\u00D7" + Math.round(height);
  };

  useEffect(() => {
    const target = containerRef.current!;
    const shadowRoot = target.getRootNode() as ShadowRoot;

    const cachedData = getCache();
    if (cachedData) {
      setBlock(cachedData);
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
            setCache({ width, height, x, y });
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
            const { width, height } = event.rect;
            setBlock({ width, height, x, y });
            setCache({ width, height, x, y });
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

  return {
    containerRef,
    setBlock
  }
}
