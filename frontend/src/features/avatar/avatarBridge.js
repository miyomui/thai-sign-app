/**
 * สะพานส่งข้อความระหว่างเว็บกับ Unity WebGL ที่ฝังใน iframe
 * รูปแบบข้อความ: docs/integration/avatar-bridge.md
 */
export const WEB_SOURCE = 'thai-sign-app';
export const UNITY_SOURCE = 'unity-avatar';

/**
 * @param {HTMLIFrameElement} iframe
 * @param {string} src URL ของ build (ใช้หา origin ที่อนุญาต)
 */
export function createAvatarBridge(iframe, src) {
  const targetOrigin = new URL(src, window.location.href).origin;
  const listeners = new Set();
  let ready = false;
  const queue = [];

  function onMessage(event) {
    if (event.origin !== targetOrigin) return; // รับเฉพาะจาก Unity ของเรา
    if (event.source !== iframe.contentWindow) return;
    const msg = event.data;
    if (!msg || msg.source !== UNITY_SOURCE) return;
    if (msg.type === 'READY') {
      ready = true;
      queue.splice(0).forEach((m) => iframe.contentWindow?.postMessage(m, targetOrigin));
    }
    listeners.forEach((fn) => fn(msg));
  }
  window.addEventListener('message', onMessage);

  return {
    /** ส่งคำสั่ง เช่น send('PLAY_SIGN', { clipId: 'V001', speed: 1 }) — ถ้า Unity ยังไม่พร้อม จะรอคิวไว้ */
    send(type, payload = {}) {
      const msg = { source: WEB_SOURCE, type, payload };
      if (ready) iframe.contentWindow?.postMessage(msg, targetOrigin);
      else queue.push(msg);
    },
    /** ฟังข้อความจาก Unity — คืนฟังก์ชันสำหรับเลิกฟัง */
    subscribe(fn) {
      listeners.add(fn);
      return () => listeners.delete(fn);
    },
    destroy() {
      window.removeEventListener('message', onMessage);
      listeners.clear();
    },
  };
}
