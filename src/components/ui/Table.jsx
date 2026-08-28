import { cn } from '../../lib/utils';
import Skeleton from './Skeleton';

export default function Table({ columns, data, emptyState, loading, rowKey }) {
  return (
    <div className="overflow-hidden rounded-lg border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] border-collapse text-left text-sm">
          <thead className="bg-zinc-50 text-xs uppercase tracking-wide text-zinc-500 dark:bg-zinc-900/80 dark:text-zinc-400">
            <tr>
              {columns.map((column) => (
                <th
                  className={cn('whitespace-nowrap px-4 py-3 font-semibold', column.className)}
                  key={column.key}
                  scope="col"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100 dark:divide-zinc-800">
            {loading ? (
              Array.from({ length: 5 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column) => (
                    <td className="px-4 py-4" key={column.key}>
                      <Skeleton className="h-5 w-full max-w-32" />
                    </td>
                  ))}
                </tr>
              ))
            ) : data.length ? (
              data.map((item, index) => (
                <tr
                  className="transition hover:bg-zinc-50/80 dark:hover:bg-zinc-800/45"
                  key={rowKey ? rowKey(item, index) : index}
                >
                  {columns.map((column) => (
                    <td className={cn('px-4 py-4 align-middle', column.cellClassName)} key={column.key}>
                      {column.cell ? column.cell(item, index) : item[column.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length}>{emptyState}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
