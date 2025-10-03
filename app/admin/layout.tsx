// app/admin/layout.tsx
'use client';

import { Separator } from '@/components/ui/separator';
import Sidebar from './Sidebar';
import { useUser } from '@clerk/nextjs';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { isLoaded, user } = useUser();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Clerk yüklenmeden önce bekle
    if (!isLoaded) return;

    // Kullanıcı yoksa middleware zaten yönlendirdi
    // Ama ekstra güvenlik için kontrol et
    if (!user) {
      router.push(`/sign-in?redirect_url=${pathname}`);
      return;
    }

    // Eğer /admin'e direkt gidildiyse /admin/products'a yönlendir
    if (pathname === '/admin') {
      router.replace('/admin/products');
    }
  }, [isLoaded, user, pathname, router]);

  // Loading state
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  // Kullanıcı yoksa (middleware redirect etmeden önce)
  if (!user) {
    return null;
  }

  // Admin kontrolü middleware'de yapılıyor, buraya geldiyse admin'dir
  return (
    <>
      <h2 className='text-2xl pl-4'>Dashboard</h2>
      <Separator className='mt-2' />
      <section className='grid lg:grid-cols-12 gap-12 mt-12'>
        <div className='lg:col-span-2'>
          <Sidebar />
        </div>
        <div className='lg:col-span-10 px-4'>{children}</div>
      </section>
    </>
  );
}