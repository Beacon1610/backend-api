
import { useMemo, useState } from 'react';
import { Search, UserPlus } from 'lucide-react';
import { toast } from 'sonner';
import UsersTable from '../components/users/UsersTable';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import Input from '../components/ui/Input';
import PageHeader from '../components/ui/PageHeader';
import { sampleUsers } from '../data/mockData';

export default function Users() {
  const [search, setSearch] = useState('');
  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return sampleUsers;

    return sampleUsers.filter((user) =>
      [user.name, user.email, user.role, user.status].join(' ').toLowerCase().includes(query)
    );
  }, [search]);

  return (
    <>
      <PageHeader
        actions={
          <Button onClick={() => toast.success('Invitation prepared')}>
            <UserPlus aria-hidden="true" className="h-4 w-4" />
            Invite User
          </Button>
        }
        eyebrow="Access"
        subtitle="Manage internal users, roles, and account status."
        title="Users"
      />

      <Card className="mb-5" padding="md">
        <div className="max-w-sm">
          <Input
            icon={Search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search users"
            type="search"
            value={search}
          />
        </div>
      </Card>

      <UsersTable
        loading={false}
        onAction={(message, user) => toast.info(`${message}: ${user.name}`)}
        users={filteredUsers}
      />
    </>
  );
}
