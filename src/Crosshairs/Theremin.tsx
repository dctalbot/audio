import { Crosshairs } from "./Crosshairs";

const makeToneConfig = ({
  rect,
  mouse,
}: {
  rect: DOMRect;
  mouse: { x: number; y: number };
}) => {
  return {
    freq: mouse.x * 2,
    volume: mouse.y && rect.height ? (1 - mouse.y / rect.height) * 2 : 1,
  };
};

function Theremin() {
  return <Crosshairs makeToneConfig={makeToneConfig} />;
}

export { Theremin };
