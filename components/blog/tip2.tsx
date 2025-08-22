"use client"
import { BlogsType } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export interface BlogTipTwoProps {
   blog:BlogsType;
}
export const BlogTip2 = ({ blog }: BlogTipTwoProps) => {
 
    return (
        <div className="flex flex-col justify-between items-center gap-4 ">
            <h2 key={blog.id} className="text-2xl font-bold group-hover:text-red-600 transition-colors duration-300">{blog.title}</h2>
            <Image alt='logo' src={blog.image} width={400} height={400} className="object-cover h-48 w-48" />
            <div className="text-center">{blog.description}</div>
            <Link href={`blog/${blog.id}`}>
                <div className="inline-block w-full px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors duration-300">Detail</div>
            </Link>
        </div>
    );
};
export default BlogTip2;