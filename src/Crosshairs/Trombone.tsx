import { Crosshairs, CrosshairsProps } from "./Crosshairs";

const notes = {
  F5: 698.456,
  B5: 493.883,

  D4: 587.33,
  Ab4: 415.305,

  Bb3: 466.164,
  E3: 329.628,

  F2: 349.228,
  B2: 246.9415,

  Bb1: 233.082,
  E1: 164.814,
};

const regsiters = [
  {
    range: [notes.F5, notes.B5],
  },
  {
    range: [notes.D4, notes.Ab4],
  },
  {
    range: [notes.Bb3, notes.E3],
  },
  {
    range: [notes.F2, notes.B2],
  },
  {
    range: [notes.Bb1, notes.E1],
  },
];

function Trombone() {
  const makeToneConfig = (reg: (typeof regsiters)[number]) => {
    const inner: CrosshairsProps["makeToneConfig"] = ({ rect, mouse, pin }) => {
      if (!rect.width || !mouse.x) {
        return { freq: 0, volume: 1 };
      }
      const mouseX = pin?.mouse?.x ?? mouse.x;

      const xPercent = mouseX / rect.width;
      const freq = (reg.range[1] - reg.range[0]) * xPercent + reg.range[0];

      return {
        freq,
        volume: 1,
      };
    };

    return inner;
  };

  return (
    <div>
      {regsiters.map((register, i) => (
        <Crosshairs
          key={i}
          makeToneConfig={makeToneConfig(register)}
          height={50}
          dimension="x"
        />
      ))}
    </div>
  );
}

export { Trombone };
