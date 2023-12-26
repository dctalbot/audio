import { Crosshairs } from "./Crosshairs";
import { MouseCoordinates } from "./useMousePosition";

const freqs = {
  F5: 698.456,
  B4: 493.883,

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
    range: [freqs.F5, freqs.B4],
  },
  {
    range: [freqs.D4, freqs.Ab4],
  },
  {
    range: [freqs.Bb3, freqs.E3],
  },
  {
    range: [freqs.F2, freqs.B2],
  },
  {
    range: [freqs.Bb1, freqs.E1],
  },
];

function Trombone() {
  const makeToneConfig =
    (reg: (typeof regsiters)[number]) =>
    ({ rect, mouse }: { rect: DOMRect; mouse: MouseCoordinates }) => {
      if (!rect.width || !mouse.x) {
        return { freq: 0, volume: 1 };
      }

      const xPercent = mouse.x / rect.width;
      const freq = (reg.range[1] - reg.range[0]) * xPercent + reg.range[0];

      return {
        freq,
        volume: 1,
      };
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
