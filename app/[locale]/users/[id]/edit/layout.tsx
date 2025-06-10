'use client';

import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';

const inter = Inter({ subsets: ['latin'] });

export default async function EditLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  let messages;
  try {
    messages = (await import(`../../../../../messages/${locale}.json`)).default;
  } catch (error) {
    console.error('Error loading messages:', error);
    return null;
  }

  return (
    <div className={inter.className}>
      <NextIntlClientProvider locale={locale} messages={messages}>
        {children}
      </NextIntlClientProvider>
    </div>
  );
} 