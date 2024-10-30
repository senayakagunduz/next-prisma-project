import { fetchFeaturedProduct } from "@/lib/actions";
import React from "react";
import EmptyList from "../global/EmptyList";
import SectionTitle from "../global/SectionTitle";
import ProductsGrid from "../products/ProductsGrid";

async function FeaturedProduct() {
  const products = await fetchFeaturedProduct();
  if (products.length === 0) return <EmptyList />;

  return (
    <section className="pt-24">
      <SectionTitle text="featured product" />
      <ProductsGrid products={products}/>
    </section>
  );
}

export default FeaturedProduct;
