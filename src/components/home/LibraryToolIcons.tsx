import type { ReactNode } from "react";
import type { IconType } from "react-icons";
import { DiAws } from "react-icons/di";
import {
  SiAngular,
  SiGooglecloud,
  SiMysql,
  SiOpenjdk,
  SiPython,
  SiReact,
} from "react-icons/si";
import { VscAzure, VscVscode } from "react-icons/vsc";

type ToolItem = {
  label: string;
  /** Brand / logo color (SVGs use currentColor). */
  color: string;
  Icon: IconType;
};

const TOOLS: ToolItem[] = [
  { label: "Software Engineer", color: "#007ACC", Icon: VscVscode },
  { label: "Java Developer", color: "#ED8B00", Icon: SiOpenjdk },
  { label: "Python Developer", color: "#3776AB", Icon: SiPython },
  { label: "MySQL & SQL", color: "#4479A1", Icon: SiMysql },
  { label: "Azure", color: "#0078D4", Icon: VscAzure },
  { label: "AWS", color: "#FF9900", Icon: DiAws },
  { label: "GCP", color: "#4285F4", Icon: SiGooglecloud },
  { label: "React Developer", color: "#61DAFB", Icon: SiReact },
  { label: "Angular Developer", color: "#DD0031", Icon: SiAngular },
];

function IconWrap({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div
      className="flex flex-col items-center justify-center gap-1.5 rounded-xl border border-white/90 bg-white/90 px-2 py-3 shadow-sm dark:border-slate-600/80 dark:bg-slate-800/90"
      title={label}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center [&>svg]:h-full [&>svg]:w-full">
        {children}
      </span>
      <span className="sr-only">{label}</span>
    </div>
  );
}

/** Brand-colored tool icons (react-icons + official-style hex colors). */
export function LibraryToolIconGrid() {
  return (
    <div className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-3 sm:gap-2.5">
      {TOOLS.map(({ label, color, Icon }) => (
        <IconWrap key={label} label={label}>
          <Icon
            aria-hidden
            className="drop-shadow-sm"
            style={{ color }}
          />
        </IconWrap>
      ))}
    </div>
  );
}
