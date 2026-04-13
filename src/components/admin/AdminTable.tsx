'use client';

import { ReactNode, useMemo, useState, useDeferredValue } from 'react';
import { AdminEmpty, AdminSkeleton } from './AdminUI';

export interface AdminTableColumn<T> {
  key: string;
  header: ReactNode;
  render: (row: T, idx: number) => ReactNode;
  className?: string;
  align?: 'left' | 'right' | 'center';
  /** Sort accessor -- returns a comparable value */
  sortValue?: (row: T) => string | number;
}

interface AdminTableProps<T> {
  columns: AdminTableColumn<T>[];
  data: T[];
  rowKey: (row: T) => string;
  loading?: boolean;
  searchable?: {
    placeholder: string;
    fields: (row: T) => string[];
  };
  pageSize?: number;
  emptyTitle?: string;
  emptyHint?: string;
  emptyIcon?: ReactNode;
  onRowClick?: (row: T) => void;
  skeletonRows?: number;
  dense?: boolean;
}

export function AdminTable<T>({
  columns,
  data,
  rowKey,
  loading,
  searchable,
  pageSize = 20,
  emptyTitle = 'Sin datos',
  emptyHint,
  emptyIcon,
  onRowClick,
  skeletonRows = 8,
  dense,
}: AdminTableProps<T>) {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const deferredQuery = useDeferredValue(query);

  // Filter
  const filtered = useMemo(() => {
    if (!searchable || !deferredQuery.trim()) return data;
    const q = deferredQuery.toLowerCase().trim();
    return data.filter((row) =>
      searchable.fields(row).some((v) => v?.toLowerCase().includes(q)),
    );
  }, [data, deferredQuery, searchable]);

  // Reset page when query changes
  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const safePage = Math.min(page, totalPages);
  const pageStart = (safePage - 1) * pageSize;
  const pageEnd = pageStart + pageSize;
  const paginated = filtered.slice(pageStart, pageEnd);

  if (loading) {
    return (
      <div>
        {searchable && (
          <div className="mb-4">
            <AdminSkeleton className="h-10 w-80" />
          </div>
        )}
        <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
          <div className="h-11 bg-[#0A0A0A]" />
          {Array.from({ length: skeletonRows }).map((_, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-4 py-4 border-t border-[#1A1A1A]/40"
            >
              <AdminSkeleton className="w-9 h-9 rounded-full" />
              <AdminSkeleton className="h-4 w-40" />
              <AdminSkeleton className="h-4 w-24 ml-auto" />
              <AdminSkeleton className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      {searchable && (
        <div className="mb-4">
          <div className="relative max-w-md">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#666666]"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <input
              type="text"
              placeholder={searchable.placeholder}
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#111111] border border-[#1E1E1E] text-white rounded-lg pl-9 pr-4 py-2.5 text-sm placeholder:text-[#555555] focus:outline-none focus:border-[#98283A]/50 focus:ring-2 focus:ring-[#98283A]/10 transition-colors duration-150"
            />
          </div>
        </div>
      )}

      <div className="bg-[#111111] border border-[#1E1E1E] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#0A0A0A] sticky top-0 z-10">
                {columns.map((col) => (
                  <th
                    key={col.key}
                    className={`text-${
                      col.align || 'left'
                    } text-[#666666] text-[11px] font-semibold uppercase tracking-wider px-4 ${
                      dense ? 'py-2.5' : 'py-3'
                    } ${col.className || ''}`}
                  >
                    {col.header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginated.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="p-0">
                    <AdminEmpty
                      icon={emptyIcon}
                      title={emptyTitle}
                      hint={emptyHint}
                    />
                  </td>
                </tr>
              ) : (
                paginated.map((row, idx) => (
                  <tr
                    key={rowKey(row)}
                    onClick={onRowClick ? () => onRowClick(row) : undefined}
                    className={`border-t border-[#1A1A1A]/40 hover:bg-[#161616] transition-colors duration-100 ${
                      onRowClick ? 'cursor-pointer' : ''
                    } ${idx % 2 === 1 ? 'bg-[#0E0E0E]' : ''}`}
                  >
                    {columns.map((col) => (
                      <td
                        key={col.key}
                        className={`text-${col.align || 'left'} px-4 ${
                          dense ? 'py-2.5' : 'py-3.5'
                        } text-sm ${col.className || ''}`}
                      >
                        {col.render(row, pageStart + idx)}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination footer */}
        {filtered.length > pageSize && (
          <div className="flex items-center justify-between px-4 py-3 border-t border-[#1A1A1A]/40 bg-[#0A0A0A]">
            <div className="text-xs text-[#666666]">
              {pageStart + 1}–{Math.min(pageEnd, filtered.length)} / {filtered.length}
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                className="px-2.5 py-1.5 text-xs text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="prev"
              >
                ‹
              </button>
              <span className="text-xs text-[#A0A0A0] px-2">
                {safePage} / {totalPages}
              </span>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                className="px-2.5 py-1.5 text-xs text-[#A0A0A0] hover:text-white hover:bg-[#1A1A1A] rounded disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                aria-label="next"
              >
                ›
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
