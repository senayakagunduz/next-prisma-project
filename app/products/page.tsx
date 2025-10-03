"use client";

import { useSearchParams } from 'next/navigation';
import ProductsContainer from "@/components/products/ProductsContainer";

export default function ProductsPage() {
  const searchParams = useSearchParams();
  
  // Get search params on the client side
  const layout = searchParams?.get('layout') || "grid";
  const search = searchParams?.get('search') || "";
  
  return <ProductsContainer layout={layout} search={search} />;
}

// This tells Next.js to not cache this page
export const dynamic = 'force-dynamic';
