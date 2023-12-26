import { useRef } from "react";

interface DoubleClickOptions {
  onSingleClick: () => void;
  onDoubleClick: () => void;
}

function useDoubleClick(opts: DoubleClickOptions) {
  const timer = useRef(0);

  return (event: any) => {
    clearTimeout(timer.current);

    if (event.detail === 1) {
      timer.current = setTimeout(opts.onSingleClick, 200);
    } else if (event.detail === 2) {
      opts.onDoubleClick();
    }
  };
}

export { useDoubleClick };
