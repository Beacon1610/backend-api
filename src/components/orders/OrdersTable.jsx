import { Edit3, Eye, MoreHorizontal, PackageSearch, Trash2, UserRound } from 'lucide-react';
import { formatCurrency, formatDate, getInitials } from '../../lib/utils';
import { getStatusText } from '../../lib/orderTransforms';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import EmptyState from '../ui/EmptyState';
import Table from '../ui/Table';

function statusVariant(status) {
  return String(status || '').toLowerCase();
}

export default function OrdersTable({
  loading,
  onAdd,
  onDelete,
  onEdit,
  onView,
  orders,
}) {
  const columns = [
    {
      cell: (order) => (
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {order.customer ? getInitials(order.customer) : <UserRound aria-hidden="true" className="h-4 w-4" />}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-zinc-950 dark:text-white">{order.customer}</p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{order.orderId}</p>
          </div>
        </div>
      ),
      header: 'Customer',
      key: 'customer',
    },
    {
      cell: (order) => <span className="font-medium text-zinc-700 dark:text-zinc-200">{order.orderId}</span>,
      header: 'Order ID',
      key: 'orderId',
    },
    {
      cell: (order) => <span className="line-clamp-1 text-zinc-700 dark:text-zinc-200">{order.productName}</span>,
      header: 'Product',
      key: 'productName',
    },
    {
      cell: (order) => <span className="font-medium text-zinc-950 dark:text-white">{formatCurrency(order.amount)}</span>,
      header: 'Amount',
      key: 'amount',
    },
    {
      cell: (order) => <Badge variant={statusVariant(order.status)}>{getStatusText(order.status)}</Badge>,
      header: 'Status',
      key: 'status',
    },
    {
      cell: (order) => <span className="text-zinc-600 dark:text-zinc-300">{formatDate(order.createdAt)}</span>,
      header: 'Created date',
      key: 'createdAt',
    },
    {
      cell: (order) => (
        <div className="flex justify-end">
          <Dropdown
            items={[
              { icon: Eye, label: 'View details', onClick: () => onView(order) },
              { icon: Edit3, label: 'Edit order', onClick: () => onEdit(order) },
              { danger: true, icon: Trash2, label: 'Delete order', onClick: () => onDelete(order) },
            ]}
            trigger={
              <Button aria-label="Open order actions" size="icon" title="Open actions" variant="ghost">
                <MoreHorizontal aria-hidden="true" className="h-4 w-4" />
              </Button>
            }
          />
        </div>
      ),
      className: 'text-right',
      header: 'Actions',
      key: 'actions',
    },
  ];

  return (
    <Table
      columns={columns}
      data={orders}
      emptyState={
        <EmptyState
          action={{ label: 'Add Order', onClick: onAdd }}
          description="Create an order to start tracking customer demand."
          icon={PackageSearch}
          title="No orders found"
        />
      }
      loading={loading}
      rowKey={(order) => order.id}
    />
  );
}
