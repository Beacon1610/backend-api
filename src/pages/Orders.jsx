
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'sonner';
import orderApi from '../api/orderApi';
import ConfirmDialog from '../components/ConfirmDialog';
import OrderFormModal from '../components/orders/OrderFormModal';
import OrdersTable from '../components/orders/OrdersTable';
import OrderToolbar from '../components/orders/OrderToolbar';
import ErrorState from '../components/ui/ErrorState';
import PageHeader from '../components/ui/PageHeader';
import { enrichOrders, extractOrders } from '../lib/orderTransforms';

export default function Orders() {
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [editingOrder, setEditingOrder] = useState(null);
  const [error, setError] = useState('');
  const [formOpen, setFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [mutating, setMutating] = useState(false);
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const loadOrders = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const response = await orderApi.getAllOrders();
      setOrders(enrichOrders(extractOrders(response)));
    } catch {
      setError('Unable to load orders from the API.');
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        [order.orderId, order.customer, order.productName]
          .join(' ')
          .toLowerCase()
          .includes(query);
      const matchesStatus = statusFilter === 'ALL' || order.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  function openCreateModal() {
    setEditingOrder(null);
    setFormOpen(true);
  }

  function openEditModal(order) {
    setEditingOrder(order);
    setFormOpen(true);
  }

  async function submitOrder(payload) {
    setMutating(true);

    try {
      if (editingOrder) {
        await orderApi.updateOrder(editingOrder.id, payload);
        toast.success('Order updated');
      } else {
        await orderApi.createOrder(payload);
        toast.success('Order created');
      }

      setFormOpen(false);
      setEditingOrder(null);
      await loadOrders();
    } catch {
      toast.error('Unable to save order');
    } finally {
      setMutating(false);
    }
  }

  async function deleteOrder() {
    if (!deleteTarget) return;
    setMutating(true);

    try {
      await orderApi.deleteOrder(deleteTarget.id);
      toast.success('Order deleted');
      setDeleteTarget(null);
      await loadOrders();
    } catch {
      toast.error('Unable to delete order');
    } finally {
      setMutating(false);
    }
  }

  return (
    <>
      <PageHeader
        actions={null}
        eyebrow="Operations"
        subtitle="Review, filter, create, update, and remove order records."
        title="Orders"
      />

      <OrderToolbar
        onAddClick={openCreateModal}
        onSearchChange={setSearch}
        onStatusFilterChange={setStatusFilter}
        search={search}
        statusFilter={statusFilter}
      />

      {error ? <ErrorState className="mb-5" message={error} onRetry={loadOrders} title="Orders unavailable" /> : null}

      <OrdersTable
        loading={loading}
        onAdd={openCreateModal}
        onDelete={setDeleteTarget}
        onEdit={openEditModal}
        onView={(order) => toast.info(`${order.orderId} - ${order.productName}`)}
        orders={filteredOrders}
      />

      <OrderFormModal
        loading={mutating}
        onClose={() => {
          setFormOpen(false);
          setEditingOrder(null);
        }}
        onSubmit={submitOrder}
        open={formOpen}
        order={editingOrder}
      />

      <ConfirmDialog
        confirmLabel="Delete order"
        description={deleteTarget ? `Delete ${deleteTarget.orderId} permanently.` : undefined}
        loading={mutating}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={deleteOrder}
        open={Boolean(deleteTarget)}
        title="Delete order"
      />
    </>
  );
}
