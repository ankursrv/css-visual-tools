// Color tokens per tone, so light and dark sections share the same layout.
const TONES = {
  light: { eyebrow: "text-secondary", title: "text-primary", description: "text-on-surface-variant" },
  dark: { eyebrow: "text-secondary-fixed", title: "text-on-primary", description: "text-tertiary-fixed-dim" },
};

// Reusable section heading: eyebrow label + heading + supporting description.
// Layouts: "split" (heading left, description right), "centered", "stacked" (vertical, left).
export default function SectionHeading({
  variant = "split",
  tone = "light",
  eyebrow,
  title,
  description,
  className = "",
  eyebrowClassName = "mb-2",
  titleClassName = "",
  descriptionClassName = "",
  maxWidth = "max-w-2xl",
}) {
  const colors = TONES[tone] ?? TONES.light;
  const eyebrowCls = `font-label-sm text-label-sm uppercase tracking-widest ${colors.eyebrow} font-bold block ${eyebrowClassName}`.trim();
  const titleCls = `font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-bold tracking-tight ${colors.title} ${titleClassName}`.trim();
  const descCls = `font-body-md text-body-md ${colors.description} ${descriptionClassName}`.trim();

  if (variant === "centered") {
    return (
      <div className={`text-center mx-auto mb-10 md:mb-14 ${maxWidth} ${className}`.trim()}>
        <span className={eyebrowCls}>{eyebrow}</span>
        <h2 className={titleCls}>{title}</h2>
        {description && <p className={descCls}>{description}</p>}
      </div>
    );
  }

  if (variant === "stacked") {
    return (
      <div className={`${maxWidth} mb-10 md:mb-16 ${className}`.trim()}>
        <span className={eyebrowCls}>{eyebrow}</span>
        <h2 className={titleCls}>{title}</h2>
        {description && <p className={descCls}>{description}</p>}
      </div>
    );
  }

  // split (default): heading on the left, description pushed to the right on desktop.
  return (
    <div
      className={`flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 md:mb-12 ${className}`.trim()}
    >
      <div>
        <span className={eyebrowCls}>{eyebrow}</span>
        <h2 className={titleCls}>{title}</h2>
      </div>
      {description && <p className={`max-w-md ${descCls}`.trim()}>{description}</p>}
    </div>
  );
}
