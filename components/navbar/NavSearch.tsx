'use client';
import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useDebouncedCallback } from 'use-debounce';

function NavSearch() {
  //useSearchParams() ile mevcut URL'nin arama parametreleri (search) alınıyor.
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  // State (search) oluşturuluyor. Eğer URL'de search parametresi varsa, o değer başlatılıyor. Yoksa boş string ('') atanıyor.
  const [search, setSearch] = useState(
    searchParams.get('search')?.toString() || ''
  );
  const handleSearch = useDebouncedCallback((value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      // Eğer kullanıcı bir şey yazdıysa, search parametresi URL'ye eklenir
      params.set('search', value);
    } else {
      //Eğer arama kutusu boşaltılırsa, search parametresi URL'den kaldırılır 
      params.delete('search');
    }
    // Son olarak, URL güncellenir:
    replace(`/products?${params.toString()}`);
  }, 300);
  // Kullanıcı başka bir sayfaya giderse veya search parametresi silinirse, arama çubuğunu sıfırlar (setSearch('')).
  useEffect(() => {
    if (!searchParams.get('search')) {
      setSearch('');
    }
  }, [searchParams.get('search')]);
  return (
    <Input
      type='search'
      placeholder='search product...'
      className='max-w-xs dark:bg-muted '
      onChange={(e) => {
        setSearch(e.target.value);
        handleSearch(e.target.value);
      }}
      value={search}
    />
  );
}
export default NavSearch;