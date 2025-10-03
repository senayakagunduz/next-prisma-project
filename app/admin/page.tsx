'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminPage() {
  // Bu sayfa artık kullanılmayacak çünkü yönlendirme layout'ta yapılıyor
  // Ancak yine de burada kalmaya devam edebilir
  const router = useRouter();

  useEffect(() => {
    // Çift yönlendirme olmaması için bir süre bekle
    const timer = setTimeout(() => {
      router.replace('/admin/products');
    }, 50);
    
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        <p className="mt-4">Yönlendiriliyorsunuz...</p>
      </div>
    </div>
  );
}
