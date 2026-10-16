import Icon from "@/components/finpay/Icon";

// Reusable data-driven card grid.
// variant="experience" (default): light cards with an optional icon + link row.
// variant="step": dark numbered cards with a gradient overlay + icon/tag row.
export default function ExperienceCardGrid({
  cards,
  icon,
  variant = "experience",
  className,
}) {
  const gridClass =
    className ??
    (variant === "step"
      ? "grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8"
      : "grid grid-cols-1 md:grid-cols-3 gap-6");

  return (
    <div className={gridClass}>
      {cards.map((ExCard, index) =>
        variant === "step" ? (
          <div
            key={ExCard.n ?? index}
            className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-tertiary-container ring-1 ring-inset ring-white/5 transition-shadow duration-300 hover:shadow-xl hover:shadow-black/20"
          >
            {/* Full-bleed image with a soft gradient blending into the card body */}
            <div className="relative w-full aspect-video shrink-0 overflow-hidden bg-surface-container">
              <img
                src={ExCard.img}
                alt={ExCard.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tertiary-container via-tertiary-container/10 to-transparent" />
              {/* Floating step badge over the image */}
              <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center font-bold font-label-lg text-label-lg shadow-lg">
                {ExCard.n}
              </div>
            </div>
            <div className="p-6 md:p-8 flex flex-col flex-1">
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-primary mb-3">
                {ExCard.title}
              </h3>
              <p className="font-body-md text-body-md text-on-primary-container">
                {ExCard.body}
              </p>
              <div className="mt-auto pt-6 flex items-center gap-2 text-secondary-fixed font-label-md text-label-md font-medium">
                <Icon name={ExCard.icon} className="text-[16px]" />
                {ExCard.tag}
              </div>
            </div>
          </div>
        ) : (
          <div
            key={index}
            className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full overflow-hidden"
          >
            {/* Full-bleed image: top corners follow the card's rounding, bottom stays square */}
            <div className="w-full aspect-video shrink-0 overflow-hidden bg-surface-container">
              <img
                src={ExCard.img}
                alt={ExCard.alt}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-6 md:p-8 flex flex-col justify-between flex-1">
              {icon && <div className="w-12 h-12 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-secondary group-hover:text-on-secondary transition-colors mb-6">
                <Icon name={ExCard.icon} className="text-[24px]" />
              </div>}
              <h3 className="font-headline-sm text-headline-sm font-bold text-on-surface mb-2">
                {ExCard.title}
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant">
                {ExCard.body}
              </p>
              <div className="mt-8 pt-4 flex items-center gap-1.5 text-secondary font-label-lg text-label-lg">
                <span>{ExCard.link}</span>
                <Icon
                  name="arrow_forward"
                  className="text-[16px] group-hover:translate-x-1 transition-transform"
                />
              </div>
            </div>
          </div>
        )
      )}
    </div>
  );
}
