import { useState, useEffect } from "react";

interface UseMousePositionConfig {
  element: HTMLElement | null;
}

interface UseMousePositionResult {
  x: number;
  y: number;
}

function useMousePosition(cfg: UseMousePositionConfig): UseMousePositionResult {
  const [result, setResult] = useState<UseMousePositionResult>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (ev) => {
      const elem = cfg?.element?.getBoundingClientRect() as DOMRect;
      if (!elem) {
        return;
      }
      if (
        ev.clientX > elem.left &&
        ev.clientX < elem.right &&
        ev.clientY > elem.top &&
        ev.clientY < elem.bottom
      ) {
        setResult({
          y: ev.clientY - elem.top,
          x: ev.clientX - elem.left,
        });
      }
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, [cfg.element]);

  return result;
}

export { useMousePosition };
