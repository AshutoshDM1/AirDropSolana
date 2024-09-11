"use client";
import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const WalletConnectionProvider = dynamic(
  () => import('@/components/WalletConnectionProvider'),
  { ssr: false }
);

export default function AppWalletProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <WalletConnectionProvider>
          {children}
        </WalletConnectionProvider>
      )}
    </>
  );
}