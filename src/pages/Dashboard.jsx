
import { useCallback, useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Clock3, ShoppingCart, UsersRound } from 'lucide-react';
import orderApi from '../api/orderApi';
import DashboardCharts from '../components/dashboard/DashboardCharts';
import KpiCard from '../components/dashboard/KpiCard';
import ErrorState from '../components/ui/ErrorState';
import PageHeader from '../components/ui/PageHeader';
import { sampleUsers } from '../data/mockData';
import { extractOrders, getDashboardOrders } from '../lib/orderTransforms';

export default function Dashboard() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [rawOrders, setRawOrders] = useState([]);

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await orderApi.getAllOrders();
      setRawOrders(extractOrders(response));
    } catch {
      setError('Unable to load live order data from the API.');
      setRawOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const dashboardOrders = useMemo(() => getDashboardOrders(rawOrders), [rawOrders]);
  const completedOrders = dashboardOrders.filter((order) => order.status === 'COMPLETED').length;
  const pendingOrders = dashboardOrders.filter((order) => order.status === 'PENDING').length;

  const kpis = [
    {
      accent: 'sky',
      icon: ShoppingCart,
      label: 'Total Orders',
      trend: '+12.5% compared to last month',
      value: dashboardOrders.length,
    },
    {
      accent: 'violet',
      icon: UsersRound,
      label: 'Total Users',
      trend: '+6.8% compared to last month',
      value: sampleUsers.length,
    },
    {
      accent: 'amber',
      icon: Clock3,
      label: 'Pending Orders',
      trend: '+4.2% compared to last month',
      value: pendingOrders,
    },
    {
      accent: 'emerald',
      icon: CheckCircle2,
      label: 'Completed Orders',
      trend: '+18.4% compared to last month',
      value: completedOrders,
    },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Overview"
        subtitle="Track order flow, revenue, and fulfillment status from one executive view."
        title="Dashboard"
      />

      {error ? <ErrorState className="mb-5" message={error} onRetry={loadOrders} title="Live data unavailable" /> : null}

      <div className="mb-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi) => (
          <KpiCard key={kpi.label} loading={loading} {...kpi} />
        ))}
      </div>

      <DashboardCharts loading={loading} orders={dashboardOrders} />
    </>
  );
}
