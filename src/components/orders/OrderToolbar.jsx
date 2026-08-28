import { Filter, Plus, Search } from 'lucide-react';
import { getStatusText, orderStatuses } from '../../lib/orderTransforms';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import Input from '../ui/Input';

export default function OrderToolbar({
  onAddClick,
  onSearchChange,
  onStatusFilterChange,
  search,
  statusFilter,
}) {
  const statusItems = [
    {
      active: statusFilter === 'ALL',
      label: 'All statuses',
      onClick: () => onStatusFilterChange('ALL'),
    },
    ...orderStatuses.map((status) => ({
      active: statusFilter === status,
      label: getStatusText(status),
      onClick: () => onStatusFilterChange(status),
    })),
  ];

  return (
    <div className="mb-5 flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
      <div className="w-full lg:max-w-sm">
        <Input
          icon={Search}
          onChange={(event) => onSearchChange(event.target.value)}
          placeholder="Search orders"
          type="search"
          value={search}
        />
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Dropdown
          items={statusItems}
          trigger={
            <Button variant="secondary">
              <Filter aria-hidden="true" className="h-4 w-4" />
              {statusFilter === 'ALL' ? 'Filter' : getStatusText(statusFilter)}
            </Button>
          }
        />
        <Button onClick={onAddClick}>
          <Plus aria-hidden="true" className="h-4 w-4" />
          Add Order
        </Button>
      </div>
    </div>
  );
}
