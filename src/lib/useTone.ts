import { useContext, useEffect, useState } from "react";
import { AppAudioContext } from "./ToneProvider";

interface Tone {
  freq: number;
  volume: number;

  // play basically just turns up the volume
  play: () => void;
  // stop sets the volume to zero
  stop: () => void;

  // advanced users can dig into the audio primitives
  oscillatorNode: OscillatorNode;
  gainNode: GainNode;
}

export interface UseToneOptions {
  // frequency in hertz between -24000 and 24000
  freq: number;
  // gain value between 0 and 1
  volume: number;
}

const defaultOptions: UseToneOptions = {
  freq: 440,
  volume: 1,
};

function useTone(options: Partial<UseToneOptions>): Tone {
  const { ctx } = useContext(AppAudioContext);
  const [osc] = useState<OscillatorNode>(ctx.createOscillator());
  const [gain] = useState<GainNode>(ctx.createGain());

  // derive final configuration
  const cfg = {
    ...defaultOptions,
    ...options,
  } as UseToneOptions;

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
    play,
    stop,

    oscillatorNode: osc,
    gainNode: gain,
  };
}

export { useTone };
