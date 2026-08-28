import { useMemo, useState } from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { BarChart3 } from 'lucide-react';
import Button from '../ui/Button';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import ChartTooltip from './ChartTooltip';
import LoadingChart from './LoadingChart';
import { buildDailyData, buildMonthlyData } from './chartData';

export default function OrderStatisticsChart({ loading, orders }) {
  const [range, setRange] = useState('day');
  const data = useMemo(
    () => (range === 'day' ? buildDailyData(orders) : buildMonthlyData(orders)),
    [orders, range]
  );
  const hasOrders = orders.length > 0;

  return (
    <Card className="xl:col-span-2">
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-semibold text-zinc-950 dark:text-white">Order statistics</h2>
          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Daily and monthly volume</p>
        </div>
        <div className="inline-flex w-fit rounded-lg border border-zinc-200 bg-zinc-50 p-1 dark:border-zinc-800 dark:bg-zinc-950">
          <Button onClick={() => setRange('day')} size="sm" variant={range === 'day' ? 'primary' : 'ghost'}>
            Day
          </Button>
          <Button onClick={() => setRange('month')} size="sm" variant={range === 'month' ? 'primary' : 'ghost'}>
            Month
          </Button>
        </div>
      </div>
      {loading ? (
        <LoadingChart />
      ) : hasOrders ? (
        <div className="h-80">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
              <XAxis axisLine={false} dataKey="label" tickLine={false} />
              <YAxis allowDecimals={false} axisLine={false} tickLine={false} />
              <Tooltip content={<ChartTooltip />} cursor={{ fill: 'rgba(113, 113, 122, 0.08)' }} />
              <Bar dataKey="orders" fill="#0ea5e9" name="Orders" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState icon={BarChart3} title="No order statistics yet" />
      )}
    </Card>
  );
}
