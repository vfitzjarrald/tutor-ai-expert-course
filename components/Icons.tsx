import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function baseProps({ size = 20, className, ...rest }: IconProps) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
    "aria-hidden": true as const,
    ...rest,
  };
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1" />
      <circle cx="12" cy="12" r="3.25" />
    </svg>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3.5v3M16 3.5v3M3.5 10h17" />
    </svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16.5H7.5A2.5 2.5 0 0 0 5 22V5.5Z" />
      <path d="M5 19.5A2.5 2.5 0 0 1 7.5 17H19" />
    </svg>
  );
}

export function MoreIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="5" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="12" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function GateIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 20V6.5L12 3l8 3.5V20" />
      <path d="M9 20v-6h6v6" />
      <path d="M9 11h6" />
    </svg>
  );
}

export function LayersIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M12 3.5 3.5 8 12 12.5 20.5 8 12 3.5Z" />
      <path d="M3.5 12.5 12 17l8.5-4.5" />
      <path d="M3.5 16.5 12 21l8.5-4.5" />
    </svg>
  );
}

export function UserIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 19.5a7 7 0 0 1 14 0" />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 12.5 10 17.5 19 7.5" />
    </svg>
  );
}

export function ProgressIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M4 19V9M10 19V5M16 19v-7M20 19v-3" />
    </svg>
  );
}

export function QuizIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M9 9a3 3 0 1 1 4.2 2.75c-.8.4-1.2.95-1.2 1.75V14" />
      <circle cx="12" cy="17.5" r="1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="9" />
    </svg>
  );
}

export function NewsIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M5 6.5h11.5A2.5 2.5 0 0 1 19 9v10.5H7.5A2.5 2.5 0 0 1 5 17V6.5Z" />
      <path d="M8.5 10h7M8.5 13.5h7M8.5 17h4.5" />
    </svg>
  );
}

export function ChevronDownIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M6 9.5 12 15.5 18 9.5" />
    </svg>
  );
}

export function TrophyIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M8 4h8v3a4 4 0 0 1-8 0V4Z" />
      <path d="M8 5H5.5A2.5 2.5 0 0 0 5.5 10H8" />
      <path d="M16 5h2.5A2.5 2.5 0 0 1 18.5 10H16" />
      <path d="M10 14h4v2.5a2 2 0 0 1-2 2h0a2 2 0 0 1-2-2V14Z" />
      <path d="M8 20h8" />
    </svg>
  );
}

export function FolderIcon(props: IconProps) {
  return (
    <svg {...baseProps(props)}>
      <path d="M3 7.5A1.5 1.5 0 0 1 4.5 6H9l1.5 2H19.5A1.5 1.5 0 0 1 21 9.5v8A1.5 1.5 0 0 1 19.5 19h-15A1.5 1.5 0 0 1 3 17.5v-10Z" />
    </svg>
  );
}
