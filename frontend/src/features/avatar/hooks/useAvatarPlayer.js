import { useCallback, useEffect, useRef, useState } from 'react';
import { AVATAR_URL, CAMERAS } from '../config';
import { createAvatarBridge } from '../avatarBridge';

/**
 * ควบคุมการเล่นท่าของอวตาร
 * - มี Unity build → ส่งคำสั่งผ่าน postMessage และอ่านตำแหน่งจาก PROGRESS
 * - ยังไม่มี → จำลองเวลาเล่น (เพื่อให้ UI ใช้งานได้ระหว่างรอ)
 *
 * t: ตำแหน่ง 0–100 (%)
 */
export function useAvatarPlayer({ clipId } = {}) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const [stopAt, setStopAt] = useState(100);
  const [speed, setSpeedState] = useState(1);
  const [camIndex, setCamIndex] = useState(0);
  const [status, setStatus] = useState(AVATAR_URL ? 'loading' : 'placeholder'); // loading | ready | error | placeholder
  const bridgeRef = useRef(null);

  const send = (type, payload) => bridgeRef.current?.send(type, payload);

  // เปลี่ยนคำ → เริ่มใหม่
  useEffect(() => {
    setPlaying(false);
    setT(0);
    setStopAt(100);
  }, [clipId]);

  // จำลองเวลาเล่น (ใช้เมื่อไม่มี Unity)
  useEffect(() => {
    if (!playing || bridgeRef.current) return undefined;
    const id = setInterval(() => {
      setT((prev) => {
        const next = prev + 1.6 * speed;
        if (next >= stopAt) {
          setPlaying(false);
          return stopAt >= 100 ? 0 : stopAt;
        }
        return next;
      });
    }, 50);
    return () => clearInterval(id);
  }, [playing, speed, stopAt]);

  /** AvatarStage เรียกเมื่อ iframe พร้อม */
  const attachFrame = useCallback((iframe) => {
    bridgeRef.current?.destroy();
    bridgeRef.current = null;
    if (!iframe || !AVATAR_URL) return;
    const bridge = createAvatarBridge(iframe, AVATAR_URL);
    bridge.subscribe((msg) => {
      if (msg.type === 'READY') setStatus('ready');
      if (msg.type === 'PROGRESS') setT(msg.payload.progress * 100);
      if (msg.type === 'CLIP_ENDED') setPlaying(false);
      if (msg.type === 'ERROR') setStatus('error');
    });
    bridgeRef.current = bridge;
  }, []);

  useEffect(() => () => bridgeRef.current?.destroy(), []);

  const play = () => {
    setStopAt(100);
    setPlaying(true);
    send(t > 0 ? 'RESUME' : 'PLAY_SIGN', { clipId, speed });
  };
  const pause = () => {
    setPlaying(false);
    send('PAUSE');
  };
  const toggle = () => (playing ? pause() : play());
  const replay = () => {
    setT(0);
    setStopAt(100);
    setPlaying(true);
    send('PLAY_SIGN', { clipId, speed });
  };
  const seek = (pct) => {
    const v = Math.max(0, Math.min(99, pct));
    setT(v);
    setStopAt(100);
    send('SEEK', { progress: v / 100 });
  };
  /** เล่นเฉพาะช่วง from–to (0–100) เช่น ขั้นตอนที่ 2 ของท่า */
  const playSegment = (from, to) => {
    setT(from);
    setStopAt(to);
    setPlaying(true);
    send('PLAY_SEGMENT', { clipId, from: from / 100, to: to / 100 });
  };
  const setSpeed = (v) => {
    setSpeedState(v);
    send('SET_SPEED', { speed: v });
  };
  const toggleSlow = () => setSpeed(speed === 1 ? 0.5 : 1);
  const setCamera = (i) => {
    setCamIndex(i);
    send('SET_CAMERA', { camera: CAMERAS[i].id });
  };
  const rotateCamera = () => setCamera((camIndex + 1) % CAMERAS.length);

  /** ขั้นที่กำลังเล่น (0-based) เมื่อท่าแบ่งเป็น n ขั้นเท่าๆ กัน, -1 = ยังไม่เล่น */
  const currentStep = (n) => (playing || t > 0 ? Math.min(n - 1, Math.floor(t / (100 / n))) : -1);

  const camLabel = CAMERAS[camIndex].label;
  const statusText = (steps = 4) => {
    if (status === 'error') return 'โหลดโมเดลไม่สำเร็จ';
    if (playing) return `กำลังเล่น · ขั้นที่ ${currentStep(steps) + 1}/${steps} · ${camLabel} · ${speed}x`;
    if (t > 0) return `หยุดชั่วคราว · ${camLabel} · ${speed}x`;
    return 'ท่าพร้อม (idle) · กด ▶ เพื่อเล่น';
  };

  return {
    playing, t, speed, camIndex, camLabel, status,
    play, pause, toggle, replay, seek, playSegment, setSpeed, toggleSlow, setCamera, rotateCamera,
    currentStep, statusText, attachFrame,
  };
}
