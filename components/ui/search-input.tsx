"use client";

import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search symbols, companies, sectors..."
}: SearchInputProps) {
  return (
    <label className="flex min-w-0 flex-1 items-center gap-3 rounded-2xl border border-border bg-secondary/60 px-4 py-3 text-sm shadow-panel">
      <Search className="h-4 w-4 text-muted-foreground" />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full min-w-0 bg-transparent text-foreground outline-none placeholder:text-muted-foreground"
      />
    </label>
  );
}
