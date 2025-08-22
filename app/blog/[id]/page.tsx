import { Blogs } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface BlogDetailPage {
    params: {
        id: string;
    }
}

const BlogDetailPage = ({ params }: BlogDetailPage) => {
    const { id } = params;
    const blog = Blogs.find((blog) => blog.id === id);

    return (
        <>
            {!blog ?
                <>
                    <h2>Not Found</h2>
                    <Link href="/blog">
                        <div className="mt-6 inline-block w-full px-4 py-2 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 dıration-700 transition">
                            Back to Blog
                        </div>
                    </Link>
                </> :
                <>
                    <div>BlogDetailPage</div>
                    <Image alt='logo' src={blog.image} width={400} height={400} className="object-cover h-72 w-72" />
                    <h2 className="text-2xl font-bold">{blog.title}</h2>
                    <div className="w-full">{blog.description}</div>
                    <Link href="/blog">
                        <div className="mt-6 inline-block w-full px-4 py-2 bg-red-600 text-white text-center rounded-lg hover:bg-red-700 dıration-700 transition">
                            Back to Blog
                        </div>
                    </Link>
                </>
            }

        </>
    )


};
export default BlogDetailPage;