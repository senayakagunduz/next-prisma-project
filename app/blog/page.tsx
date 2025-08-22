"use client"
import BlogTip1 from "@/components/blog/tip1";
import BlogTip2 from "@/components/blog/tip2";
import { Blogs, BlogsType } from "@/constants";
import { useEffect, useState } from "react";

interface BlogPage {
    params: {
        id: string
    }
}
export const BlogPage = ({ params }: BlogPage) => {
    const [blogs, setBlogs] = useState<BlogsType[]>([]);

    useEffect(() => {
        setBlogs(Blogs);
    }, [])
    return (
        <>
            <h2 className="text-center text-2xl font-bold mb-6">Tip1</h2>
            <div className="flex flex-row justify-center items-center gap-4">
                {blogs.map((blog) => (
                    <BlogTip1 key={blog.id} id={Number(blog.id)} title={blog.title} description={blog.description} image={blog.image} active={blog.active} />
                ))}
            </div>
            
            <hr className="h-2 w-100 text-grey-100 py-4 mt-10"/>

            <h2 className="text-center text-2xl font-bold mb-6">Tip2</h2>
            <div className="flex flex-row justify-center items-center gap-4">
                {blogs.map((blog) => (
                    <BlogTip2  key={blog.id} blog={blog} />
                ))}
            </div>
        </>
    );
};
export default BlogPage;