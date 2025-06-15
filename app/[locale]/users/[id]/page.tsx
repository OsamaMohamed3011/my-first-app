import { getTranslations } from 'next-intl/server';
import { API_ENDPOINTS } from '@/app/lib/api';
import { User } from '@/app/types';


async function getUser(id: string): Promise<User> {
  const response = await fetch(API_ENDPOINTS.users.get(parseInt(id)).toString());
  if (!response.ok) {
    throw new Error('Failed to fetch user');
  }
  return response.json();
}

export default async function UserDetailsPage({
  params: { id },
}: {
  params: { id: string };
}) {
  const t = await getTranslations('userDetails');
  const user = await getUser(id);

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <h1 className="text-2xl font-semibold text-secondary-dark mb-6">
          {t('title')}
        </h1>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <h2 className="text-lg font-medium text-secondary-dark">
                {`${user.firstName} ${user.lastName}`}
              </h2>
              <p className="text-secondary-main">{user.email}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-secondary-dark">
                Location
              </h3>
              <p className="text-secondary-main">
                Lat: {user.address.coordinates.lat}
              </p>
              <p className="text-secondary-main">.
                Lng: {user.address.coordinates.lng}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-secondary-dark">
                Bank Details
              </h3>
              <p className="text-secondary-main">
                Card Number: {user.bank.cardNumber}
              </p>
              <p className="text-secondary-main">
                Expires: {user.bank.cardExpire}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-medium text-secondary-dark">
              {t('company.title')}
            </h2>
            
            <div>
              <h3 className="text-sm font-medium text-secondary-dark">
                {t('company.name')}
              </h3>
              <p className="text-secondary-main">{user.company.name}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-secondary-dark">
                {t('company.department')}
              </h3>
              <p className="text-secondary-main">{user.company.department}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-secondary-dark">
                {t('company.title')}
              </h3>
              <p className="text-secondary-main">{user.company.title}</p>
            </div>

            <div>
              <h3 className="text-sm font-medium text-secondary-dark">
                {t('company.address')}
              </h3>
              <p className="text-secondary-main">
                {user.company.address.address}
              </p>
              <p className="text-secondary-main">
                {user.company.address.city}, {user.company.address.state} {user.company.address.postalCode}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 