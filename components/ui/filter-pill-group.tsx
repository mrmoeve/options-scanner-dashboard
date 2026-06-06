"use client";

interface FilterPillGroupProps {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

export function FilterPillGroup({
  label,
  options,
  value,
  onChange
}: FilterPillGroupProps) {
  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">{label}</p>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {options.map((option) => {
          const active = option === value;

          return (
            <button
              key={option}
              type="button"
              onClick={() => onChange(option)}
              className={[
                "whitespace-nowrap rounded-full border px-3 py-2 text-sm transition",
                active
                  ? "border-cyan-400/40 bg-cyan-400/15 text-cyan-200"
                  : "border-border bg-secondary/50 text-muted-foreground hover:border-cyan-500/20 hover:text-foreground"
              ].join(" ")}
            >
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}
