"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Label } from "../ui/label";
import { Card } from "../ui/card";
import { NotebookPenIcon } from "lucide-react";
import { useBlogContext } from "@/store/blogs";
import Loader from "../ui/loader";

const BlogListing = ({ blogData = [] }: { blogData: any[] }) => {
  const { addPost } = useBlogContext();
  const router = useRouter();
  const [displayedBlogs, setDisplayedBlogs] = useState<any[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

  useEffect(() => {
    setDisplayedBlogs(blogData.slice(0, itemsPerPage));
    setIsFetching(false);
  }, [blogData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 100
      ) {
        setIsFetching(true);
        setTimeout(() => {
          loadMoreBlogs();
          setIsFetching(false);
        }, 1000);
      } else {
        setIsFetching(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [page, blogData]);

  const loadMoreBlogs = () => {
    const startIndex = page * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const newBlogs = blogData.slice(startIndex, endIndex);

    if (newBlogs.length > 0) {
      setDisplayedBlogs((prevBlogs) => [...prevBlogs, ...newBlogs]);
      setPage(page + 1);
    }
  };

  const handleBlogDetail = (blogData: any) => {
    addPost(blogData);
    router.push(`/blog/${blogData.id}`);
  };

  return (
    <div className='bg-background'>
      <header className='px-8 py-4 bg-background w-full border-b sticky top-0 z-40'>
        <Label className='text-md font-semibold'> Blog Detail</Label>
      </header>
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-2 md:gap-8 py-4 px-4 md:px-8'>
        {displayedBlogs.map((blog) => (
          <Card
            key={blog.id}
            className='cursor-pointer overflow-hidden'
            onClick={() => handleBlogDetail(blog)}
          >
            <div className='px-4 py-4 flex flex-col gap-4'>
              <NotebookPenIcon />
              <Label className='text-md font-semibold'>{blog.title}</Label>
            </div>
          </Card>
        ))}
      </div>
      {isFetching && <Loader />}
    </div>
  );
};

export default BlogListing;
