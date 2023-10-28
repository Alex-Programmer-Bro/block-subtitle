import { Root, createRoot } from "react-dom/client";
import { App } from "./App";

let root: Root | null = null;

chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (root) {
    root.unmount();
    root = null;
  } else {
    const div = document.createElement("div");
    document.body.appendChild(div);

    root = createRoot(div);
    root.render(<App />);
  }

  sendResponse("icon clicked");
});
