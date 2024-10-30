import LoadingContainer from "@/components/global/LoadingContainer";
import FeaturedProduct from "@/components/home/FeaturedProduct";
import Hero from "@/components/home/Hero";
import { Suspense } from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Suspense fallback={<LoadingContainer />}>
        <FeaturedProduct />
      </Suspense>
    </div>
  );
}
