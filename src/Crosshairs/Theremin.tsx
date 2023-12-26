import { Crosshairs, CrosshairsProps } from "./Crosshairs";

const makeToneConfig: CrosshairsProps["makeToneConfig"] = ({
  rect,
  mouse,
  pin,
}) => {
  const mouseX = pin?.mouse?.x ?? mouse.x;
  const mouseY = pin?.mouse?.y ?? mouse.y;
  return {
    freq: mouseX * 2,
    volume: mouseY && rect.height ? 1 - mouseY / rect.height : 1,
  };
};

function Theremin() {
  return <Crosshairs makeToneConfig={makeToneConfig} />;
}

export { Theremin };
