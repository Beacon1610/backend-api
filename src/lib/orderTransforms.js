import { customers, sampleOrders } from '../data/mockData';

export const orderStatuses = ['PENDING', 'PROCESSING', 'COMPLETED', 'CANCELLED'];

export function extractOrders(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.content)) return payload.content;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.items)) return payload.items;
  return [];
}

export function normalizeStatus(status, seed = 0) {
  const normalizedStatus = String(status || '').toUpperCase();

  if (orderStatuses.includes(normalizedStatus)) {
    return normalizedStatus;
  }

  return orderStatuses[Math.abs(seed) % orderStatuses.length];
}

export function getStatusText(status) {
  const normalizedStatus = normalizeStatus(status);
  return normalizedStatus.charAt(0) + normalizedStatus.slice(1).toLowerCase();
}

export function enrichOrder(order, index = 0) {
  const id = Number(order?.id || order?.orderId || index + 1);
  const productName = order?.productName || order?.product || `Order item ${id}`;
  const createdAt =
    order?.createdAt ||
    order?.createdDate ||
    order?.date ||
    new Date(Date.now() - index * 86400000).toISOString();

  return {
    ...order,
    amount: Number(order?.amount || order?.total || order?.price || 240 + (id % 9) * 160),
    createdAt,
    customer: order?.customer || order?.customerName || customers[id % customers.length],
    id,
    orderId: `#ORD-${String(id).padStart(5, '0')}`,
    productName,
    status: normalizeStatus(order?.status, id),
  };
}

export function enrichOrders(orders) {
  return orders.map((order, index) => enrichOrder(order, index));
}

export function getDashboardOrders(orders) {
  const normalizedOrders = enrichOrders(orders);
  return normalizedOrders.length ? normalizedOrders : sampleOrders.map(enrichOrder);
}
