import { Placeholder } from '@/components/ui';
import { cn } from '@/lib/utils/cn';
import { AVATAR_URL } from '../config';

/**
 * พื้นที่แสดงอวตาร 3D
 * - มี VITE_AVATAR_URL → ฝัง Unity WebGL ใน iframe
 * - ไม่มี → กล่อง placeholder พร้อมสถานะการเล่น
 * children: ปุ่มที่ลอยทับมุมบนซ้าย (เช่น เลือกมุมกล้อง)
 */
export function AvatarStage({ player, clipId, label = '3D AVATAR VIEWER · UNITY WEBGL', ariaLabel, className, children }) {
  if (AVATAR_URL) {
    const src = `${AVATAR_URL}${AVATAR_URL.includes('?') ? '&' : '?'}clip=${encodeURIComponent(clipId ?? '')}`;
    return (
      <div className={cn('relative overflow-hidden bg-surface', className)}>
        <iframe
          ref={player.attachFrame}
          src={src}
          title={ariaLabel ?? `อวตาร 3 มิติ ${clipId ?? ''}`}
          className="absolute inset-0 size-full border-0"
          allow="fullscreen"
        />
        {children && <div className="absolute left-3 top-3 flex gap-1.5">{children}</div>}
      </div>
    );
  }

  return (
    <Placeholder
      tone="pink"
      role="img"
      aria-label={ariaLabel ?? `อวตาร 3 มิติ ${clipId ?? ''}`}
      label={label}
      sublabel={player.statusText()}
      className={className}
    >
      {children && <div className="absolute left-3 top-3 flex gap-1.5">{children}</div>}
    </Placeholder>
  );
}
