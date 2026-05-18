import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export function JobPrepLogo({
  className = "h-9 w-9",
  priority = false,
}: Props) {
  return (
    <span
      className={`relative inline-block shrink-0 overflow-hidden rounded-xl ${className}`}
    >
      <Image
        src="/icon.png"
        alt=""
        fill
        className="object-contain"
        sizes="80px"
        priority={priority}
      />
    </span>
  );
}
