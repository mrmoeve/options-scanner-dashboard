interface PageHeaderProps {
  eyebrow: string;
  title: string;
  description: string;
}

export function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <div className="mb-8 space-y-3">
      <p className="text-xs uppercase tracking-[0.28em] text-primary">{eyebrow}</p>
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">{title}</h1>
      <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">{description}</p>
    </div>
  );
}
