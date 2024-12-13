import { forwardRef } from 'react';
import { type LucideIcon } from 'lucide-react';

export const TikTok = forwardRef<SVGSVGElement>((props, ref) => {
  return (
    <svg
      ref={ref}
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M16.6 5.82s.51.5 0 0A4.278 4.278 0 015.9 5.82s-.51.5 0 0" />
      <path d="M17 15.6c-3.888 0-7-3.112-7-7s3.112-7 7-7 7 3.112 7 7-3.112 7-7 7z" />
      <path d="M10.9 12.486c-2.23 0-4.014 1.784-4.014 4.014S8.67 20.514 10.9 20.514s4.014-1.784 4.014-4.014S13.13 12.486 10.9 12.486z" />
    </svg>
  );
}) as LucideIcon;

TikTok.displayName = 'TikTok';