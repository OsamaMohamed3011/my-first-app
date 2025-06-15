import { Inter } from 'next/font/google';
import ClientProvider from './ClientProvider';

const inter = Inter({ subsets: ['latin'] });

export default async function EditLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  // Load messages on the server side
  let messages;
  try {
    messages = (await import(`../../../../../messages/${params.locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    return null;
  }

  return (
    <div className={inter.className}>
      <ClientProvider locale={params.locale} messages={messages}>
        {children}
      </ClientProvider>
    </div>
  );
} 