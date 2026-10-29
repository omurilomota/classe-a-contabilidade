import type { SVGProps } from "react";

export type IconName =
  | "arrow-right"
  | "arrow-up-right"
  | "arrow-left"
  | "check"
  | "check-circle"
  | "calendar"
  | "clock"
  | "map-pin"
  | "shield"
  | "sparkles"
  | "building"
  | "ledger"
  | "users"
  | "receipt"
  | "swap"
  | "compass"
  | "menu"
  | "close"
  | "chevron-down"
  | "mail"
  | "phone"
  | "lock"
  | "file"
  | "quote"
  | "alert"
  | "calculator"
  | "home"
  | "info"
  | "cookie"
  | "target"
  | "heart";

const paths: Record<IconName, React.ReactNode> = {
  "arrow-right": <path d="M5 12h14M13 6l6 6-6 6" />,
  "arrow-up-right": <path d="M7 17 17 7M8 7h9v9" />,
  "arrow-left": <path d="M19 12H5M11 18l-6-6 6-6" />,
  check: <path d="m5 12 4.5 4.5L19 7" />,
  "check-circle": (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12 2.5 2.5 4.5-5" />
    </>
  ),
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3v4M8 3v4M3 10h18" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </>
  ),
  "map-pin": (
    <>
      <path d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="2.6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 5 6v6c0 4.5 3 7.5 7 9 4-1.5 7-4.5 7-9V6l-7-3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3l1.6 4.4L18 9l-4.4 1.6L12 15l-1.6-4.4L6 9l4.4-1.6L12 3Z" />
      <path d="M18.5 15.5l.8 2.2 2.2.8-2.2.8-.8 2.2-.8-2.2-2.2-.8 2.2-.8.8-2.2Z" />
    </>
  ),
  building: (
    <>
      <path d="M4 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M16 9h3a1 1 0 0 1 1 1v11M2 21h20M8 7h4M8 11h4M8 15h4" />
    </>
  ),
  ledger: (
    <>
      <path d="M5 3h11l3 3v15H5V3Z" />
      <path d="M9 8h6M9 12h6M9 16h4M16 3v4h4" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8" r="3.2" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 5.2a3.2 3.2 0 0 1 0 5.6M18 14.5c2 .8 3 2.8 3 5.5" />
    </>
  ),
  receipt: (
    <>
      <path d="M6 3h12v18l-3-2-3 2-3-2-3 2V3Z" />
      <path d="M9 8h6M9 12h6" />
    </>
  ),
  swap: (
    <>
      <path d="M4 8h13l-3-3M20 16H7l3 3" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  close: <path d="M6 6l12 12M18 6 6 18" />,
  "chevron-down": <path d="m6 9 6 6 6-6" />,
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </>
  ),
  phone: <path d="M5 3h4l2 5-3 2a13 13 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A17 17 0 0 1 3 5a2 2 0 0 1 2-2Z" />,
  lock: (
    <>
      <rect x="4" y="10" width="16" height="11" rx="2" />
      <path d="M8 10V7a4 4 0 0 1 8 0v3" />
    </>
  ),
  file: (
    <>
      <path d="M6 3h8l4 4v14H6V3Z" />
      <path d="M14 3v4h4M9 12h6M9 16h6" />
    </>
  ),
  quote: (
    <>
      <path d="M9 7H5v5h4v5H4M20 7h-4v5h4v5h-5" />
    </>
  ),
  alert: (
    <>
      <path d="M12 3 2.5 20h19L12 3Z" />
      <path d="M12 9v5M12 17.2v.1" />
    </>
  ),
  calculator: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <path d="M8 7h8M8 11h2M14 11h2M8 15h2M14 15h2M8 18h2M14 18h2" />
    </>
  ),
  home: <path d="m3 11 9-8 9 8M5 10v10h14V10M9 20v-6h6v6" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5M12 8v.1" />
    </>
  ),
  cookie: (
    <>
      <path d="M21 12a9 9 0 1 1-9-9 4 4 0 0 0 4 4 4 4 0 0 0 4 4 1 1 0 0 0 1 1Z" />
      <path d="M8 10v.1M12 15v.1M15 11v.1M8 15v.1" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-9.2A4 4 0 0 1 12 8a4 4 0 0 1 7 2.8C19 15.6 12 20 12 20Z" />,
};

type IconProps = SVGProps<SVGSVGElement> & {
  name: IconName;
  size?: number;
};

export function Icon({ name, size = 20, className, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}

export function WhatsAppIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.19 1.87.12.57-.09 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
      <path d="M12.04 2C6.6 2 2.17 6.43 2.17 11.88c0 1.74.45 3.44 1.32 4.94L2 22l5.32-1.4a9.86 9.86 0 0 0 4.72 1.2h.01c5.43 0 9.86-4.43 9.86-9.88A9.8 9.8 0 0 0 19 4.87 9.8 9.8 0 0 0 12.04 2Zm0 18.06h-.01a8.2 8.2 0 0 1-4.17-1.14l-.3-.18-3.1.81.83-3.02-.2-.31a8.16 8.16 0 0 1-1.25-4.34c0-4.52 3.68-8.2 8.2-8.2a8.15 8.15 0 0 1 8.19 8.21c0 4.52-3.68 8.17-8.19 8.17Z" />
    </svg>
  );
}

export function InstagramIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5v.1" />
    </svg>
  );
}

export function FacebookIcon({ size = 20, className }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M14 8.5V6.9c0-.8.2-1.2 1.3-1.2H17V2.1c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.5-4 4.2v2.3H7.5v3.8h3.1V22H14v-9.7h3.1l.5-3.8H14Z" />
    </svg>
  );
}
