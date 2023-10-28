import { useEffect, useState } from "react";

export const usePressing = () => {
  const [pressing, setPressing] = useState(false);

  useEffect(() => {
    const onPress = (e: KeyboardEvent) => {
      if (e.key === "s") {
        setPressing(true);
      }
    };

    const onUp = () => {
      setPressing(false);
    };

    window.addEventListener("keypress", onPress);
    window.addEventListener("keyup", onUp);

    return () => {
      window.removeEventListener("keypress", onPress);
      window.removeEventListener("keyup", onUp);
    };
  }, []);

  return pressing;
};
