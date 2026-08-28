import { useMemo } from 'react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { ReceiptText } from 'lucide-react';
import { formatCurrency } from '../../lib/utils';
import Card from '../ui/Card';
import EmptyState from '../ui/EmptyState';
import ChartTooltip from './ChartTooltip';
import LoadingChart from './LoadingChart';
import { buildMonthlyData } from './chartData';

export default function RevenueChart({ loading, orders }) {
  const data = useMemo(() => buildMonthlyData(orders), [orders]);
  const hasOrders = orders.length > 0;

  return (
    <Card className="xl:col-span-3">
      <div className="mb-5">
        <h2 className="text-base font-semibold text-zinc-950 dark:text-white">Revenue chart</h2>
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">Estimated order value by month</p>
      </div>
      {loading ? (
        <LoadingChart />
      ) : hasOrders ? (
        <div className="h-80">
          <ResponsiveContainer height="100%" width="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="revenueFill" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.34} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e4e4e7" vertical={false} />
              <XAxis axisLine={false} dataKey="label" tickLine={false} />
              <YAxis axisLine={false} tickFormatter={(value) => `$${Number(value) / 1000}k`} tickLine={false} />
              <Tooltip content={<ChartTooltip valueFormatter={formatCurrency} />} />
              <Area
                dataKey="revenue"
                fill="url(#revenueFill)"
                name="Revenue"
                stroke="#10b981"
                strokeWidth={2}
                type="monotone"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <EmptyState icon={ReceiptText} title="No revenue data yet" />
      )}
    </Card>
  );
}
