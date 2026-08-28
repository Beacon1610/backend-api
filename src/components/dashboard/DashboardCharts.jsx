import OrderStatisticsChart from './OrderStatisticsChart';
import OrderStatusChart from './OrderStatusChart';
import RevenueChart from './RevenueChart';

export default function DashboardCharts({ loading, orders }) {
  return (
    <div className="grid gap-5 xl:grid-cols-3">
      <OrderStatisticsChart loading={loading} orders={orders} />
      <OrderStatusChart loading={loading} orders={orders} />
      <RevenueChart loading={loading} orders={orders} />
    </div>
  );
}
