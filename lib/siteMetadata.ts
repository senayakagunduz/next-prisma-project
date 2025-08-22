interface SiteMetadata {
  title: string;
  authors: { name: string }[];
  description: string;
  email: string;
  github: string;
  keywords: string[];
  siteUrl: string;
}

export const siteMetadata: SiteMetadata = {
  title: "Next Store Frontend",
  authors: [{ name: "Şenay Akagündüz" }],
  description: "Anifty store built Next.js",
  email: "senayakgndz@gmail.com",
  github: "senayakgndz",
  keywords: ["nextjs", "typescript", "prisma", "tailwindcss", "clerk", "next-themes"],
  siteUrl: "https://next-store-frontend.vercel.app",
};