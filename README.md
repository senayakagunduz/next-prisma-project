useDebouncedCallback fonksiyonu sayesinde handleSearch, 300ms gecikmeli çalışıyor.
Kullanıcı her harfe bastığında, fonksiyon hemen çalışmaz.
Eğer kullanıcı yazmaya devam ederse, önceki çağrıyı iptal eder ve sadece sonuncusunu çalıştırır.
✅ Debounce, bir fonksiyonun her çalıştırılma girişimi arasındaki süreyi kısıtlar.
✅ Kullanıcı yazmayı bırakana kadar fonksiyon çağrılmaz.
✅ Gereksiz API isteklerini önler ve performansı artırır.


👇 Debounce olmadan: (Her harf için çağrılır)
User types: "iphone"
Requests sent: "i" → "ip" → "iph" → "ipho" → "iphone"

👇 Debounce ile: (Sadece en son haliyle çağrılır)
User types: "iphone"
Request sent: "iphone" (300ms bekledikten sonra)

```javascript
 const handleSearch = useDebouncedCallback((value: string) => {
  const params = new URLSearchParams(searchParams);
  if (value) {
    params.set('search', value);
  } else {
    params.delete('search');
  }
  replace(`/products?${params.toString()}`);
}, 300); 