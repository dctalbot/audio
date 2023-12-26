import { useContext, useEffect, useRef } from "react";
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
  // frequency in hertz between 1 and 24000
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
  const osc = useRef<OscillatorNode>(ctx.createOscillator()).current;
  const gain = useRef<GainNode>(ctx.createGain()).current;

  // derive final configuration
  const opts: UseToneOptions = {
    ...defaultOptions,
    ...options,
  };

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
    osc.frequency.setValueAtTime(opts.freq, ctx.currentTime);
  }, [opts.freq]);

  useEffect(() => {
    gain.gain.setValueAtTime(opts.volume, ctx.currentTime);
  }, [opts.volume]);

  const play = () => {
    try {
      osc.start();
    } catch (e) {}
    gain.gain.setValueAtTime(opts.volume, ctx.currentTime);
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
