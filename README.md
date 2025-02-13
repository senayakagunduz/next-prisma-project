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

👇 Object.fromEntries() özellikle form verilerini işlerken çok kullanışlı bir JavaScript metodudur.
// FormData entries() metodu aşağıdaki gibi bir yapı döndürür:
[
  ['name', 'John'],
  ['email', 'john@example.com'],
  ['age', '25']
]

// Object.fromEntries() bunu şu şekilde bir objeye dönüştürür:
{
  name: 'John',
  email: 'john@example.com',
  age: '25'
}
// Diyelim ki formunuzda şu alanlar var:
<form action={createProductAction}>
  <input name="title" value="Telefon" />
  <input name="price" value="1000" />
  <input name="description" value="Yeni model" />
</form>

// Object.fromEntries() sonrası rawData şöyle olur:
{
  title: "Telefon",
  price: "1000",
  description: "Yeni model"
}

mesela talep formum var diyelim, başlık, talep, email i dolduracak ve gönder tuşuna basıp gönderecek, ve bunu zod ile validasyonu yapmak istiyorum, ve de typescript kullanmışım, buna nasıl bir action yazmalıyım, bana bununla ilgili neler yazmam gerektiğini anlatr mısın adım adım

-----------------1-------------
import { z } from "zod";

export const requestFormSchema = z.object({
  title: z.string().min(3, "Başlık en az 3 karakter olmalıdır"),
  email: z.string().email("Geçerli bir email adresi giriniz"),
  request: z.string().min(10, "Talep en az 10 karakter olmalıdır"),
});

// TypeScript tip tanımı
export type RequestFormType = z.infer<typeof requestFormSchema>;

----------------2-----------------
Server Action'ı oluşturalım (actions/request-actions.ts):
'use server'

import { requestFormSchema } from "@/schemas/request-schema";
import { db } from "@/lib/db";

export const createRequestAction = async (
  prevState: { message: string },
  formData: FormData,
) => {
  try {
    // Form verilerini objeye çevirme
    const rawFormData = Object.fromEntries(formData.entries());
    
    // Zod ile validasyon
    const validatedFields = requestFormSchema.safeParse(rawFormData);

    // Validasyon hatası varsa
    if (!validatedFields.success) {
      return {
        message: "Validasyon hatası: " + validatedFields.error.errors[0].message
      };
    }

    // Veritabanına kaydetme
    await db.request.create({
      data: {
        title: validatedFields.data.title,
        email: validatedFields.data.email,
        request: validatedFields.data.request,
      }
    });

    return {
      message: "Talebiniz başarıyla gönderildi!"
    };

  } catch (error) {
    return {
      message: "Bir hata oluştu: " + (error as Error).message
    };
  }
};

------------------3----------------
Form component'ini oluşturalım (components/request-form.tsx):
'use client'

import { useFormState } from "react-dom";
import { createRequestAction } from "@/actions/request-actions";

const initialState = {
  message: "",
};

export default function RequestForm() {
  const [state, formAction] = useFormState(createRequestAction, initialState);

  return (
    <form action={formAction} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Başlık
        </label>
        <input
          type="text"
          id="title"
          name="title"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      <div>
        <label htmlFor="request" className="block text-sm font-medium text-gray-700">
          Talebiniz
        </label>
        <textarea
          id="request"
          name="request"
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          required
        />
      </div>

      {state.message && (
        <p className={state.message.includes("hata") ? "text-red-500" : "text-green-500"}>
          {state.message}
        </p>
      )}

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
      >
        Gönder
      </button>
    </form>
  );
}
--------------------4--------------------
Prisma şeması ekleyelim (prisma/schema.prisma):
model Request {
  id        String   @id @default(cuid())
  title     String
  email     String
  request   String   @db.Text
  createdAt DateTime @default(now())

  @@map("requests")
}
----------------5--------------------------
Formu sayfada kullan (app/requests/page.tsx):

import RequestForm from "@/components/request-form";

export default function RequestPage() {
  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Talep Formu</h1>
      <RequestForm />
    </div>
  );
}
Bu yapı:

TypeScript tip güvenliği sağlar
Zod ile form validasyonu yapar
Server action ile form verilerini işler
Prisma ile veritabanına kaydeder
Hata ve başarı mesajlarını kullanıcıya gösterir
Client-side ve server-side validasyon sağlar

Server Action vs. Geleneksel API:

1.Yazım Şekli ve Kullanım:

// Server Action (utils/action.ts)
export const createProductAction = async (prevState, formData) => {
    // işlemler...
}

// Geleneksel API (pages/api/products.ts veya app/api/products/route.ts)
export async function POST(request: Request) {
    const data = await request.json()
    // işlemler...
    return Response.json({ message: 'success' })
}
2.Temel Farklar:

Kolaylık: Server Actions doğrudan form elementleriyle kullanılabilir, ekstra fetch kodu yazmanıza gerek kalmaz
Optimizasyon: Next.js otomatik olarak client ve server arasındaki iletişimi optimize eder
Progressive Enhancement: JavaScript devre dışı olsa bile formlar çalışmaya devam eder

3.Kullanım Örneği:
// Server Action kullanımı (Client Component)
<form action={createProductAction}>
    <input name="title" />
    <button type="submit">Gönder</button>
</form>

// API endpoint kullanımı
const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/products', {
        method: 'POST',
        body: JSON.stringify({ title: 'örnek' })
    })
}
4.Veri İşleme:
// Server Action - Formdata otomatik işlenir
const rawData = Object.fromEntries(formData.entries());

// API - Manuel parsing gerekir
const data = await request.json();
5.Güvenlik ve Doğrulama:
Her iki yöntemde de Zod ile veri doğrulama yapabilirsiniz
Server Actions'da authentication bilgisine doğrudan erişebilirsiniz
API'lerde genellikle token kontrolü manuel yapılır
Server Actions'ın en büyük avantajı, client ve server arasındaki iletişimi basitleştirmesi ve Next.js'in built-in özelliklerinden faydalanabilmesidir. Ancak bazı durumlarda (örneğin harici servislerle entegrasyon) geleneksel API endpoints hala gerekli olabilir.

