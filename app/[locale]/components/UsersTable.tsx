'use client';

import { useTranslations } from 'next-intl';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { API_ENDPOINTS, USERS_PER_PAGE, makeApiRequest } from '@/app/lib/api';
import { transformUsersList } from '@/app/utils/userHelpers';
import type { User, UsersResponse } from '@/app/types';
import TableHeader from './TableHeader';
import TablePagination from './TablePagination';
import UserTableRow from './UserTableRow';

export default function UsersTable() {
  // Hooks and translations
  const t = useTranslations('table');
  const router = useRouter();
  const params = useParams();
  const locale = params.locale as string;
  const isRTL = locale === 'ar';

  // State management
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdatedId, setLastUpdatedId] = useState<number | null>(null);

  // Fetch users when page changes or after an update
  useEffect(() => {
    fetchUsers();
  }, [currentPage, lastUpdatedId]);

  // Fetch users from API
  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);

      const skip = (currentPage - 1) * USERS_PER_PAGE;
      const endpoint = API_ENDPOINTS.users.list(USERS_PER_PAGE, skip);
      const data = await makeApiRequest<UsersResponse>(endpoint);
      const transformedUsers = transformUsersList(data.users);
      
      setUsers(transformedUsers);
      setFilteredUsers(transformedUsers);
      setTotalPages(Math.ceil(data.total / USERS_PER_PAGE));
    } catch (error) {
      console.error('Error fetching users:', error);
      setError('Failed to load users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle search
  const handleSearch = (query: string) => {
    const filtered = users.filter(user =>
      user.firstName.toLowerCase().includes(query.toLowerCase()) ||
      user.lastName.toLowerCase().includes(query.toLowerCase()) ||
      user.email.toLowerCase().includes(query.toLowerCase()) ||
      user.accountNumber.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  };

  // Navigation handlers
  const handleAddUser = () => {
    router.push(`/${locale}/users/create`);
  };

  const handleEditUser = (userId: number) => {
    setLastUpdatedId(userId); // Set the ID of the user being edited
    router.push(`/${locale}/users/${userId}/edit`);
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#1B4D3E] bg-opacity-90 flex items-center justify-center z-50">
        <div className="text-white text-lg font-bold">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm text-center">
        {error}
        <button
          onClick={fetchUsers}
          className="mt-4 text-sm underline hover:no-underline block mx-auto"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-sm min-h-screen w-full flex flex-col">
      <TableHeader
        onSearch={handleSearch}
        onAddClick={handleAddUser}
        isRTL={isRTL}
      />

      <div className="overflow-x-auto flex-grow">
        <table className="w-full border-collapse h-full" dir={isRTL ? 'rtl' : 'ltr'}>
          <thead>
            <tr className="bg-[#D5E2B5]">
              <th className="px-4 py-2 font-normal text-sm text-[#1B4D3E] w-1/6 text-center border-x border-[#2D7B52]">
                {t('columns.accountNumber')}
              </th>
              <th className="px-4 py-2 font-normal text-sm text-[#1B4D3E] w-1/6 text-center border-x border-[#2D7B52]">
                {t('columns.name')}
              </th>
              <th className="px-4 py-2 font-normal text-sm text-[#1B4D3E] w-1/6 text-center border-x border-[#2D7B52]">
                {t('columns.email')}
              </th>
              <th className="px-4 py-2 font-normal text-sm text-[#1B4D3E] w-1/6 text-center border-x border-[#2D7B52]">
                {t('columns.currency')}
              </th>
              <th className="px-4 py-2 font-normal text-sm text-[#1B4D3E] w-1/6 text-center border-x border-[#2D7B52]">
                {t('columns.type')}
              </th>
              <th className="px-4 py-2 font-normal text-sm text-[#1B4D3E] w-1/6 text-center border-x border-[#2D7B52]">
                {t('columns.actions')}
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <UserTableRow
                key={user.id}
                user={user}
                index={index}
                onEdit={handleEditUser}
              />
            ))}
          </tbody>
          <tfoot>
            <tr className="bg-white border-t border-[#E8F1ED]">
              <td colSpan={6}>
                <TablePagination
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={setCurrentPage}
                  isRTL={isRTL}
                />
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  );
} 