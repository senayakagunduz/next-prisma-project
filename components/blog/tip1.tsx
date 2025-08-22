"use client"
import Image from "next/image";
import Link from "next/link";

export interface BlogTipOneProps {
    id: number;
    title: string;
    description: string;
    image: string;
    active: boolean;
}
export const BlogTip1 = ({ id, title, description, image}: BlogTipOneProps) => {
  
    return (
        <div className="flex flex-col justify-between items-center gap-4 ">
            <h2 key={id} className="text-2xl font-bold group-hover:text-red-600 transition-colors duration-300">{title}</h2>
            <Image alt='logo' src={image} width={400} height={400} className="object-cover h-48 w-48" />
            <div className="text-center">{description}</div>
            <Link href={`blog/${id}`}>
                <div className="inline-block w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300">Detail</div>
            </Link>
        </div>
    );
};
export default BlogTip1;