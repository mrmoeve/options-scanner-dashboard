"use client";

import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import type { ReactNode } from "react";

type SortDirection = "asc" | "desc";

export interface SortableColumn<T> {
  key: string;
  header: string;
  render: (row: T) => ReactNode;
  sortValue?: (row: T) => number | string;
  className?: string;
}

interface SortableDataTableProps<T> {
  columns: SortableColumn<T>[];
  rows: T[];
  mobileCard: (row: T) => ReactNode;
  initialSortKey?: string;
  initialSortDirection?: SortDirection;
}

export function SortableDataTable<T>({
  columns,
  rows,
  mobileCard,
  initialSortKey,
  initialSortDirection = "desc"
}: SortableDataTableProps<T>) {
  const [sortKey, setSortKey] = useState(initialSortKey ?? columns.find((column) => column.sortValue)?.key ?? columns[0]?.key);
  const [sortDirection, setSortDirection] = useState<SortDirection>(initialSortDirection);

  const activeColumn = columns.find((column) => column.key === sortKey);
  const sortedRows = [...rows].sort((left, right) => {
    if (!activeColumn?.sortValue) {
      return 0;
    }

    const a = activeColumn.sortValue(left);
    const b = activeColumn.sortValue(right);
    const comparison = typeof a === "number" && typeof b === "number" ? a - b : String(a).localeCompare(String(b));
    return sortDirection === "asc" ? comparison : -comparison;
  });

  function toggleSort(column: SortableColumn<T>) {
    if (!column.sortValue) {
      return;
    }

    if (column.key === sortKey) {
      setSortDirection((current) => (current === "asc" ? "desc" : "asc"));
      return;
    }

    setSortKey(column.key);
    setSortDirection("desc");
  }

  return (
    <>
      <div className="overflow-hidden rounded-3xl border border-border md:block">
        <div className="hidden overflow-x-auto md:block">
          <table className="min-w-full divide-y divide-border text-left">
            <thead className="bg-secondary/60">
              <tr>
                {columns.map((column) => {
                  const sortable = Boolean(column.sortValue);
                  const isActive = column.key === sortKey;

                  return (
                    <th key={column.key} className={`px-4 py-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground ${column.className ?? ""}`}>
                      <button
                        type="button"
                        disabled={!sortable}
                        onClick={() => toggleSort(column)}
                        className={`inline-flex items-center gap-2 ${sortable ? "hover:text-foreground" : "cursor-default"}`}
                      >
                        <span>{column.header}</span>
                        {sortable ? (
                          isActive ? (
                            sortDirection === "asc" ? <ArrowUp className="h-3.5 w-3.5" /> : <ArrowDown className="h-3.5 w-3.5" />
                          ) : (
                            <ChevronsUpDown className="h-3.5 w-3.5" />
                          )
                        ) : null}
                      </button>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className="divide-y divide-border bg-card">
              {sortedRows.map((row, index) => (
                <tr key={index} className="transition hover:bg-secondary/30">
                  {columns.map((column) => (
                    <td key={column.key} className={`px-4 py-4 text-sm ${column.className ?? ""}`}>
                      {column.render(row)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid gap-4 md:hidden">
        {sortedRows.map((row, index) => (
          <div key={index}>{mobileCard(row)}</div>
        ))}
      </div>
    </>
  );
}
