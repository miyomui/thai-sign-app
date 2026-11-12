/** รวมชื่อคลาส ข้ามค่าที่เป็น false/null/undefined: cn('a', ok && 'b') */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
