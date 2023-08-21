import { useContext, useEffect, useState } from "react";
import { MyContext } from "./lib/MyProvider";

interface Tone {
  freq: number;
  volume: number;

  // a user gesture is required to start audio signal
  init: () => void;

  // play basically just turns up the volume
  play: () => void;
  // stop sets the volume to zero
  stop: () => void;

  // advanced users can dig into the audio primitives
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;
}

interface Options {
  freq: number;
  volume: number;
}

const defaultOptions: Options = {
  freq: 440,
  volume: 1,
};

function useTone(options: Partial<Options>): Tone {
  const ctx = useContext<AudioContext>(MyContext);
  const [osc, setOsc] = useState<OscillatorNode>(ctx.createOscillator());
  const [gain, setGain] = useState<GainNode>(ctx.createGain());

  // derive final configuration
  const cfg = {
    ...defaultOptions,
    ...options,
  } as Options;

  console.log(cfg);

  useEffect(() => {
    osc.connect(gain);
    gain.connect(ctx.destination);

    return () => {
      osc.disconnect(ctx.destination);
      gain.disconnect(ctx.destination);
    };
  }, []);

  useEffect(() => {
    osc.frequency.setValueAtTime(cfg.freq, ctx.currentTime);
  }, [cfg.freq]);

  useEffect(() => {
    gain.gain.setValueAtTime(cfg.volume, ctx.currentTime);
  }, [cfg.volume]);

  const init = () => {
    osc.start();
  };

  const play = () => {
    gain.gain.setValueAtTime(cfg.volume, ctx.currentTime);
  };

  const stop = () => {
    gain.gain.setValueAtTime(0, ctx.currentTime);
  };

  return {
    freq: osc.frequency.value,
    volume: gain.gain.value,
    init,
    play,
    stop,

    oscillatorNode: osc,
    gainNode: gain,
  };
}

export { useTone };