interface SectionHeaderProps {
  kicker: string;
  title: string;
  description?: string;
}

export function SectionHeader({ kicker, title, description }: SectionHeaderProps) {
  return (
    <div className="flex flex-col gap-space-xs">
      <div className="inline-flex w-fit items-center gap-space-xs rounded-full border border-tertiary/20 bg-surface-container-high/60 px-space-sm py-space-2xs shadow-sm backdrop-blur-md">
        <span className="h-1.5 w-1.5 rounded-full bg-tertiary shadow-[0_0_8px_#4cd7f6]" />
        <span className="font-mono text-mono-caption uppercase tracking-wider text-tertiary font-semibold">
          {kicker}
        </span>
      </div>

      <h2 className="font-sans text-headline-lg-mobile font-bold tracking-tight text-on-surface md:text-headline-lg">
        {title}
      </h2>

      {description && (
        <p className="mt-space-2xs font-body-base text-body-base text-on-surface-variant md:max-w-2xl md:text-body-lg leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
