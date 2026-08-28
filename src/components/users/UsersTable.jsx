import { Edit3, Mail, MoreHorizontal, ShieldCheck, UserRoundCog } from 'lucide-react';
import { getInitials } from '../../lib/utils';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import Dropdown from '../ui/Dropdown';
import EmptyState from '../ui/EmptyState';
import Table from '../ui/Table';

function statusVariant(status) {
  return String(status || '').toLowerCase();
}

export default function UsersTable({ loading, onAction, users }) {
  const columns = [
    {
      cell: (user) => (
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-zinc-100 text-xs font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-200">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0">
            <p className="truncate font-medium text-zinc-950 dark:text-white">{user.name}</p>
            <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{user.email}</p>
          </div>
        </div>
      ),
      header: 'Name',
      key: 'name',
    },
    {
      cell: (user) => <span className="text-zinc-600 dark:text-zinc-300">{user.email}</span>,
      header: 'Email',
      key: 'email',
    },
    {
      cell: (user) => (
        <Badge variant="default">
          <ShieldCheck aria-hidden="true" className="mr-1 h-3 w-3" />
          {user.role}
        </Badge>
      ),
      header: 'Role',
      key: 'role',
    },
    {
      cell: (user) => <Badge variant={statusVariant(user.status)}>{user.status}</Badge>,
      header: 'Status',
      key: 'status',
    },
    {
      cell: (user) => (
        <div className="flex justify-end">
          <Dropdown
            items={[
              { icon: Mail, label: 'Send email', onClick: () => onAction('Email opened', user) },
              { icon: Edit3, label: 'Edit profile', onClick: () => onAction('Profile opened', user) },
            ]}
            trigger={
              <Button aria-label="Open user actions" size="icon" title="Open actions" variant="ghost">
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
      data={users}
      emptyState={<EmptyState icon={UserRoundCog} title="No users found" />}
      loading={loading}
      rowKey={(user) => user.id}
    />
  );
}
