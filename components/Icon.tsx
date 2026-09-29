import type { IconName } from '@/content/services';

type Part = [string, Record<string, string | number>];

const PATHS: Record<Exclude<IconName, 'whatsapp'>, Part[]> = {
  arrow: [['path', { d: 'M5 12h14' }], ['path', { d: 'm12 5 7 7-7 7' }]],
  send: [['path', { d: 'M22 2 11 13' }], ['path', { d: 'M22 2 15 22l-4-9-9-4 20-7z' }]],
  cap: [['path', { d: 'M22 10 12 5 2 10l10 5 10-5z' }], ['path', { d: 'M6 12v5c0 1.7 2.7 3 6 3s6-1.3 6-3v-5' }]],
  visa: [['rect', { x: 3, y: 4, width: 18, height: 16, rx: 2 }], ['path', { d: 'M7 4v16' }], ['path', { d: 'M11 9h6' }], ['path', { d: 'M11 13h6' }]],
  award: [['circle', { cx: 12, cy: 9, r: 6 }], ['path', { d: 'm8.5 14-1.5 8 5-3 5 3-1.5-8' }]],
  home: [['path', { d: 'M3 10.5 12 3l9 7.5' }], ['path', { d: 'M5 9.5V21h14V9.5' }], ['path', { d: 'M10 21v-6h4v6' }]],
  chat: [['path', { d: 'M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z' }]],
  check: [['path', { d: 'M20 6 9 17l-5-5' }]],
  compass: [['circle', { cx: 12, cy: 12, r: 9 }], ['path', { d: 'm15.5 8.5-2 5-5 2 2-5z' }]],
  book: [['path', { d: 'M4 5a2 2 0 0 1 2-2h14v16H6a2 2 0 0 0-2 2z' }], ['path', { d: 'M4 21V5' }], ['path', { d: 'M9 8h7' }]],
  plane: [['path', { d: 'M10.5 13.5 3 11l1.5-1.5 8 1 4.5-5a2 2 0 0 1 3 3l-5 4.5 1 8L14.5 22 12 14.5' }]],
};

const WA =
  'M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.42.25-.7.25-1.29.18-1.42-.07-.12-.27-.2-.57-.35zM12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.3-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2z';

export function Icon({ name, size = 20, strokeWidth = 2.2 }: { name: IconName; size?: number; strokeWidth?: number }) {
  if (name === 'whatsapp') {
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false">
        <path d={WA} />
      </svg>
    );
  }
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      {PATHS[name].map(([tag, attrs], i) => {
        const Tag = tag as 'path';
        return <Tag key={i} {...(attrs as object)} />;
      })}
    </svg>
  );
}
