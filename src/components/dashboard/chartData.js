import { getStatusText, orderStatuses } from '../../lib/orderTransforms';

export const statusColors = {
  CANCELLED: '#e11d48',
  COMPLETED: '#10b981',
  PENDING: '#f59e0b',
  PROCESSING: '#8b5cf6',
};

function safeDate(value) {
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date() : date;
}

function getDateKey(value) {
  return safeDate(value).toISOString().slice(0, 10);
}

function getMonthKey(value) {
  const date = safeDate(value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
}

export function buildDailyData(orders) {
  const today = new Date();

  return Array.from({ length: 7 }).map((_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    const key = getDateKey(date);
    const matchingOrders = orders.filter((order) => getDateKey(order.createdAt) === key);

    return {
      label: new Intl.DateTimeFormat('en-US', { weekday: 'short' }).format(date),
      orders: matchingOrders.length,
      revenue: matchingOrders.reduce((total, order) => total + order.amount, 0),
    };
  });
}

export function buildMonthlyData(orders) {
  const today = new Date();

  return Array.from({ length: 6 }).map((_, index) => {
    const date = new Date(today.getFullYear(), today.getMonth() - (5 - index), 1);
    const key = getMonthKey(date);
    const matchingOrders = orders.filter((order) => getMonthKey(order.createdAt) === key);

    return {
      label: new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date),
      orders: matchingOrders.length,
      revenue: matchingOrders.reduce((total, order) => total + order.amount, 0),
    };
  });
}

export function buildStatusData(orders) {
  return orderStatuses
    .map((status) => ({
      color: statusColors[status],
      name: getStatusText(status),
      status,
      value: orders.filter((order) => order.status === status).length,
    }))
    .filter((item) => item.value > 0);
}
