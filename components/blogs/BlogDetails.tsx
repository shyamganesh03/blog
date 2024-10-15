"use client";

import React from "react";
import { Label } from "../ui/label";
import { useBlogContext } from "@/store/blogs";
import CommandSection from "./comments";
import { ModeToggle } from "../ui/theme-toogle";

const BlogDetails = ({ blogId }: { blogId: string }) => {
  const { getPosts } = useBlogContext();

  const postDetails = getPosts(blogId);

  return (
    <div className='bg-background'>
      <header className='px-8 py-4 bg-background w-full border-b sticky top-0 z-40 flex justify-between items-center'>
        <Label className='text-md font-semibold'>Blog Detail</Label>
        <ModeToggle />
      </header>
      <div className='py-4 px-8'>
        <Label className='text-md'>{postDetails?.body || ""}</Label>
        <CommandSection items={postDetails?.comments} id={blogId} />
      </div>
    </div>
  );
};

export default BlogDetails;
