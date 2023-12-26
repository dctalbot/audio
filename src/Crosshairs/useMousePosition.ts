import { useState, useEffect } from "react";

interface UseMousePositionConfig {
  // Provide an element in order to get the mouse coordinates relative to that element.
  // If blank, mouse coordinates will be relative to the client viewport.
  element?: HTMLElement | null;
}

export interface MouseCoordinates {
  x: number;
  y: number;
}

function useMousePosition(cfg: UseMousePositionConfig): MouseCoordinates {
  const [result, setResult] = useState<MouseCoordinates>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      const elem = cfg?.element?.getBoundingClientRect() as DOMRect;
      if (!elem) {
        setResult({
          y: ev.clientY,
          x: ev.clientX,
        });
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
