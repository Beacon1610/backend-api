import { useMemo } from 'react';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';
import { PackageCheck } from 'lucide-react';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import ChartTooltip from './ChartTooltip';
import LoadingChart from './LoadingChart';
import { buildStatusData } from './chartData';

export default function OrderStatusChart({ loading, orders }) {
  const data = useMemo(() => buildStatusData(orders), [orders]);
  const hasOrders = orders.length > 0;

  return (
    <Card>
      <div className="mb-5">
        <h2 className="text-base font-semibold text-zinc-950 dark:text-white">Order status</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Current workflow split</p>
      </div>
      {loading ? (
        <LoadingChart />
      ) : hasOrders ? (
        <div className="h-80">
          <ResponsiveContainer height="75%" width="100%">
            <PieChart>
              <Pie data={data} dataKey="value" innerRadius={64} nameKey="name" outerRadius={96} paddingAngle={4}>
                {data.map((entry) => (
                  <Cell fill={entry.color} key={entry.status} />
                ))}
              </Pie>
              <Tooltip content={<ChartTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2">
            {data.map((item) => (
              <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-300" key={item.status}>
                <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                <span className="truncate">{item.name}</span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <EmptyState icon={PackageCheck} title="No status data yet" />
      )}
    </Card>
  );
}
