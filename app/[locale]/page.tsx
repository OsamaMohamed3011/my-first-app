import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import UsersTable from './components/UsersTable';

export default async function UsersPage() {
  const t = await getTranslations('table');

  return (
    <main className="container mx-auto p-4 bg-green">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <UsersTable />
      </div>
    </main>
  );
} 