import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/utils/cn";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import type { UnitId } from "@/lib/site";
import { Icon, WhatsAppIcon, type IconName } from "./Icons";
import { Link } from "@/lib/router";

type Variant = "primary" | "gold" | "outline" | "light" | "ghost" | "whatsapp";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-55 focus-visible:outline-3 focus-visible:outline-offset-3";

const variants: Record<Variant, string> = {
  primary: "bg-navy-900 text-white shadow-soft hover:bg-navy-800 hover:shadow-lift active:translate-y-px",
  gold: "bg-gold-500 text-navy-950 shadow-soft hover:bg-gold-400 hover:shadow-lift active:translate-y-px",
  outline: "border border-navy-900/20 bg-white/80 text-navy-900 hover:border-navy-900/45 hover:bg-white",
  light: "bg-white text-navy-900 shadow-soft hover:bg-cream-100",
  ghost: "text-navy-900 hover:bg-navy-900/5",
  whatsapp: "bg-[#0b6b45] text-white shadow-soft hover:bg-[#095737] hover:shadow-lift active:translate-y-px",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3.5 text-[0.95rem]",
};

export function buttonClasses(variant: Variant = "primary", size: Size = "md", className?: string) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  size?: Size;
};

export function Button({ variant = "primary", size = "md", className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, size, className)} {...rest} />;
}

type WhatsAppLinkProps = {
  unit?: UnitId;
  message: string;
  campaign: string;
  content: string;
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  className?: string;
  showIcon?: boolean;
  ariaLabel?: string;
};

export function WhatsAppLink({
  unit = "dracena",
  message,
  campaign,
  content,
  children,
  variant = "primary",
  size = "md",
  className,
  showIcon = true,
  ariaLabel,
}: WhatsAppLinkProps) {
  return (
    <a
      href={buildWhatsAppUrl({ unit, message, campaign, content })}
      target="_blank"
      rel="noopener noreferrer"
      className={buttonClasses(variant, size, className)}
      aria-label={ariaLabel}
    >
      {showIcon && <WhatsAppIcon size={18} className="shrink-0" />}
      <span>{children}</span>
    </a>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  tone = "light",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className,
      )}
    >
      {eyebrow && (
        <p className={cn("eyebrow mb-3", tone === "dark" ? "text-gold-400" : "text-gold-600")}>
          <span className={cn("h-px w-6", tone === "dark" ? "bg-gold-400" : "bg-gold-500")} aria-hidden="true" />
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          "text-[1.75rem] leading-[1.12] font-semibold sm:text-4xl lg:text-[2.65rem]",
          tone === "dark" && "text-cream-50",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("mt-4 text-base leading-7 sm:text-[1.05rem]", tone === "dark" ? "text-navy-100" : "text-muted")}>
          {description}
        </p>
      )}
    </div>
  );
}

type BadgeProps = {
  children: ReactNode;
  tone?: "gold" | "navy" | "outline" | "success" | "warning" | "light";
  className?: string;
  icon?: IconName;
};

const badgeTones: Record<NonNullable<BadgeProps["tone"]>, string> = {
  gold: "bg-gold-100 text-gold-600 border-gold-200",
  navy: "bg-navy-900 text-cream-50 border-navy-900",
  outline: "bg-white/70 text-navy-800 border-navy-900/15",
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  warning: "bg-amber-50 text-amber-800 border-amber-200",
  light: "bg-white/10 text-cream-50 border-white/20",
};

export function Badge({ children, tone = "gold", className, icon }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold",
        badgeTones[tone],
        className,
      )}
    >
      {icon && <Icon name={icon} size={14} />}
      {children}
    </span>
  );
}



export function Accordion({ items }: { items: readonly { question: string; answer: string }[] }) {
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((item) => (
        <details key={item.question} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-5 py-5 text-left font-semibold text-navy-900 marker:hidden hover:text-navy-700 [&::-webkit-details-marker]:hidden">
            <span className="text-[0.98rem] leading-6">{item.question}</span>
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line bg-white text-navy-800 transition-transform duration-200 group-open:rotate-180">
              <Icon name="chevron-down" size={16} />
            </span>
          </summary>
          <div className="max-w-3xl pb-5 pr-10 text-[0.95rem] leading-7 text-muted">{item.answer}</div>
        </details>
      ))}
    </div>
  );
}

export function Breadcrumbs({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Você está aqui" className="mb-5">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex items-center gap-2">
            {index > 0 && (
              <span aria-hidden="true" className="text-cream-300">
                /
              </span>
            )}
            {item.to ? (
              <Link to={item.to} className="transition-colors hover:text-navy-900">
                {item.label}
              </Link>
            ) : (
              <span aria-current="page" className="font-medium text-navy-900">
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CheckList({
  items,
  tone = "light",
  className,
}: {
  items: readonly string[];
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <ul className={cn("space-y-2.5", className)}>
      {items.map((item) => (
        <li key={item} className="flex items-start gap-2.5">
          <span
            className={cn(
              "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
              tone === "dark" ? "bg-gold-500/15 text-gold-400" : "bg-gold-100 text-gold-600",
            )}
          >
            <Icon name="check" size={12} strokeWidth={2.4} />
          </span>
          <span className={cn("text-sm leading-6", tone === "dark" ? "text-navy-100" : "text-muted")}>{item}</span>
        </li>
      ))}
    </ul>
  );
}
