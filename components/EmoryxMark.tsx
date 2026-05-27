import Image from 'next/image';

type Props = {
  size?: number;
  className?: string;
  priority?: boolean;
  withHalo?: boolean;
};

export function EmoryxMark({
  size = 56,
  className = '',
  priority,
  withHalo,
}: Props) {
  return (
    <span
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {withHalo && (
        <span
          aria-hidden
          className="absolute -inset-4 -z-10 rounded-full blur-2xl opacity-60"
          style={{
            background:
              'radial-gradient(closest-side, #7C3AED55, #2563EB22 60%, transparent 75%)',
          }}
        />
      )}
      <Image
        src="/icon.png"
        alt="Emoryx"
        width={size}
        height={size}
        priority={priority}
        sizes={`${size}px`}
        className="select-none"
        draggable={false}
      />
    </span>
  );
}
