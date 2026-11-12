/** ตำแหน่งโมเดล TF.js (ทีม AI วางไว้ใน public/models/) */
export const MODEL_URL = '/models/sign-v1/model.json';
export const LABELS_URL = '/models/sign-v1/labels.json';

/** ตาม docs/integration/sign-ai-model.md */
export const SEQUENCE_LENGTH = 30;
export const FEATURES_PER_FRAME = 126; // 2 มือ × 21 จุด × (x, y, z)
export const MIN_CONFIDENCE = 0.7;
