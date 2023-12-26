import { useContext, useEffect, useState } from "react";
import { AppAudioContext } from "./ToneProvider";

interface Tone {
  freq: number;
  volume: number;

  // a user gesture is required to start audio signal
  // init: () => void;

  // play basically just turns up the volume
  play: () => void;
  // stop sets the volume to zero
  stop: () => void;

  // advanced users can dig into the audio primitives
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;
}

interface Options {
  // frequency in hertz
  // must be between -24000 and 24000
  freq: number;
  volume: number;
}

const defaultOptions: Options = {
  freq: 440,
  volume: 1,
};

function useTone(options: Partial<Options>): Tone {
  const { ctx, initialized, setInitialized } = useContext(AppAudioContext);
  const [osc, setOsc] = useState<OscillatorNode>(ctx.createOscillator());
  const [gain, setGain] = useState<GainNode>(ctx.createGain());

  // derive final configuration
  const cfg = {
    ...defaultOptions,
    ...options,
  } as Options;

  useEffect(() => {
    osc.connect(gain);
    gain.connect(ctx.destination);

    return () => {
      try {
        osc.disconnect(ctx.destination);
        gain.disconnect(ctx.destination);
      } catch (e) {}
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
    try {
      osc.start();
    } catch (e) {}
    gain.gain.setValueAtTime(cfg.volume, ctx.currentTime);
  };

  const stop = () => {
    gain.gain.setValueAtTime(0, ctx.currentTime);
  };

  return {
    freq: osc.frequency.value,
    volume: gain.gain.value,
    // init,
    play,
    stop,

    oscillatorNode: osc,
    gainNode: gain,
  };
}

export { useTone };
