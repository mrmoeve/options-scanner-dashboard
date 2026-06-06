interface SignalBadgeProps {
  value: string;
  positive?: boolean;
}

export function SignalBadge({ value, positive = true }: SignalBadgeProps) {
  return (
    <span
      className={[
        "inline-flex rounded-full px-2.5 py-1 text-xs font-medium",
        positive ? "bg-success/15 text-success" : "bg-danger/15 text-danger"
      ].join(" ")}
    >
      {value}
    </span>
  );
}
